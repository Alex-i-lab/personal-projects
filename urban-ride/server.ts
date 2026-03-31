import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON bodies
  app.use(express.json());

  // API routes FIRST
  app.post("/api/send-email", async (req, res) => {
    try {
      const { email, firstName, lastName, selectedCars } = req.body;

      if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Simulating email send.");
        return res.json({ success: true, simulated: true });
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      const carListHtml = selectedCars
        .map((car: any) => `<li><strong>${car.name}</strong> (${car.category})</li>`)
        .join("");

      const { data, error } = await resend.emails.send({
        from: "Urban Ride <onboarding@resend.dev>",
        to: email,
        subject: "Your Booking Confirmation - Urban Ride",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Booking Confirmed!</h2>
            <p>Hi ${firstName} ${lastName},</p>
            <p>Thank you for booking with Urban Ride. Your reservation has been confirmed.</p>
            <h3>Reserved Vehicles:</h3>
            <ul>
              ${carListHtml}
            </ul>
            <p>We will contact you shortly with further details about your pickup.</p>
            <br/>
            <p>Best regards,<br/>The Urban Ride Team</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(400).json({ error });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
