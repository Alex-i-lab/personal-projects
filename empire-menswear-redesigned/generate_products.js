
const csvData = `Product Name,Main Category,Subcategory,Color,Fit,Style,Occasion,Gender, Price ,SEO Title,Description,Tags,Image Src
Army Green Tuxedo,Wedding Collection,Tuxedo,Green,Slim,Classic,Wedding,Men,$377.00 ,Army Green Tuxedo for Men | Premium Tuxedo,"Army Green Tuxedo designed for wedding occasions, featuring a classic style in green, tailored for a refined and modern look.","green, classic, wedding, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774274868/Army_Green_Tuxedo_xtv9bi.webp
Ash Beige Men's Casual,Casual Collection,Smart Casual,Beige,Regular,Minimal,Casual,Men,$101.92 ,Ash Beige Men's Casual for Men | Premium Casual,"Ash Beige Men's Casual designed for casual occasions, featuring a minimal style in beige, tailored for a refined and modern look.","beige, minimal, casual, smart casual",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276103/Ash_Beige_Men_s_Casual_zga6ew.webp
Ash Beige Pinstripe Double Breasted,Formal Collection,Double Breasted,Beige,Slim,Pinstripe,Business,Men,$377.00 ,Ash Beige Pinstripe Double Breasted for Men | Premium Breasted,"Ash Beige Pinstripe Double Breasted designed for business occasions, featuring a pinstripe style in beige, tailored for a refined and modern look.","beige, pinstripe, business, double breasted",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276096/Ash_Beige_Pinstripes_Double_Breasted_irm1fl.webp
Ash Beige Women's Casual,Casual Collection,Casual,Beige,Regular,Relaxed,Casual,Women,$168.22 ,Ash Beige Women's Casual for Men | Premium Casual,"Ash Beige Women's Casual designed for casual occasions, featuring a relaxed style in beige, tailored for a refined and modern look.","beige, relaxed, casual, casual",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276096/Ash_Beige_Women_s_Casual_sq12bf.webp
Beige Double Breasted Tuxedo,Wedding Collection,Tuxedo,Beige,Slim,Double Breasted,Wedding,Men,$377.00 ,Beige Double Breasted Tuxedo for Men | Premium Tuxedo,"Beige Double Breasted Tuxedo designed for wedding occasions, featuring a double breasted style in beige, tailored for a refined and modern look.","beige, double breasted, wedding, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276095/Beige_Double_Breasted_Tuxedo_rievwi.webp
Beige Single Breasted Suit,Formal Collection,Suit,Beige,Slim,Single Breasted,Business,Men,$312.22 ,Beige Single Breasted Suit for Men | Premium Suit,"Beige Single Breasted Suit designed for business occasions, featuring a single breasted style in beige, tailored for a refined and modern look.","beige, single breasted, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276095/Beige_Single_Breasted_Suit_bdx4gy.webp
Black Pattern Tuxedo,Wedding Collection,Tuxedo,Black,Slim,Patterned,Evening,Men,$377.00 ,Black Pattern Tuxedo for Men | Premium Tuxedo,"Black Pattern Tuxedo designed for evening occasions, featuring a patterned style in black, tailored for a refined and modern look.","black, patterned, evening, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276090/Black_Pattern_Tuxedo_upejyb.webp
Black Pinstripe Single Breasted,Formal Collection,Suit,Black,Slim,Pinstripe,Business,Men,$312.22 ,Black Pinstripe Single Breasted for Men | Premium Breasted,"Black Pinstripe Single Breasted designed for business occasions, featuring a pinstripe style in black, tailored for a refined and modern look.","black, pinstripe, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276089/Black_Pinstripe_Single_Breasted_l8vwjn.webp
Black Superior Bowtie,Accessories,Bowtie,Black,,Classic,Formal,Men,$16.82 ,Black Superior Bowtie for Men | Premium Bowtie,"Black Superior Bowtie designed for formal occasions, featuring a classic style in black, tailored for a refined and modern look.","black, classic, formal, bowtie",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276089/Black_Superior_Bowtie_gbnhox.webp
Blue Pattern Tuxedo,Wedding Collection,Tuxedo,Blue,Slim,Patterned,Wedding,Men,$377.00 ,Blue Pattern Tuxedo for Men | Premium Tuxedo,"Blue Pattern Tuxedo designed for wedding occasions, featuring a patterned style in blue, tailored for a refined and modern look.","blue, patterned, wedding, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276089/Blue_Pattern_Tuxedo_esmxez.webp
Blue Velvet Tuxedo,Wedding Collection,Tuxedo,Blue,Slim,Velvet,Evening,Men,$377.00 ,Blue Velvet Tuxedo for Men | Premium Tuxedo,"Blue Velvet Tuxedo designed for evening occasions, featuring a velvet style in blue, tailored for a refined and modern look.","blue, velvet, evening, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276080/Blue_Velvet_Tuxedo_hhatpx.webp
Charcoal Grey Single Breasted,Formal Collection,Suit,Grey,Slim,Classic,Business,Men,$312.22 ,Charcoal Grey Single Breasted for Men | Premium Breasted,"Charcoal Grey Single Breasted designed for business occasions, featuring a classic style in grey, tailored for a refined and modern look.","grey, classic, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276040/Charcoal_Grey_Single_Breasted_inrewk.webp
Classic Black Tuxedo,Wedding Collection,Tuxedo,Black,Slim,Classic,Wedding,Men,$377.00 ,Classic Black Tuxedo for Men | Premium Tuxedo,"Classic Black Tuxedo designed for wedding occasions, featuring a classic style in black, tailored for a refined and modern look.","black, classic, wedding, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276040/Classic_Black_Tuxedo_rk4hs6.webp
Classic Double Breasted Grey,Formal Collection,Double Breasted,Grey,Slim,Classic,Business,Men,$312.22 ,Classic Double Breasted Grey for Men | Premium Grey,"Classic Double Breasted Grey designed for business occasions, featuring a classic style in grey, tailored for a refined and modern look.","grey, classic, business, double breasted",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276040/Classic_Double_Breasted_kbryfd.webp
Classic Offwhite Tuxedo,Wedding Collection,Tuxedo,Offwhite,Slim,Classic,Wedding,Men,$332.22 ,Classic Offwhite Tuxedo for Men | Premium Tuxedo,"Classic Offwhite Tuxedo designed for wedding occasions, featuring a classic style in offwhite, tailored for a refined and modern look.","offwhite, classic, wedding, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276038/Classic_offwhite_Tuxedo_nazeuv.webp
Coffee Brown Men's Casual,Casual Collection,Smart Casual,Brown,Regular,Relaxed,Casual,Men,$101.92 ,Coffee Brown Men's Casual for Men | Premium Casual,"Coffee Brown Men's Casual designed for casual occasions, featuring a relaxed style in brown, tailored for a refined and modern look.","brown, relaxed, casual, smart casual",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774276038/Coffee_Brown_Men_s_Casual_rlrvvk.webp
Coffee Brown Women's Casual,Casual Collection,Casual,Brown,Regular,Relaxed,Casual,Women,$168.22 ,Coffee Brown Women's Casual for Men | Premium Casual,"Coffee Brown Women's Casual designed for casual occasions, featuring a relaxed style in brown, tailored for a refined and modern look.","brown, relaxed, casual, casual",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275975/Coffee_Brown_Women_s_Casual_qemzbx.webp
Cream Pattern Tuxedo,Wedding Collection,Tuxedo,Cream,Slim,Patterned,Wedding,Men,$377.00 ,Cream Pattern Tuxedo for Men | Premium Tuxedo,"Cream Pattern Tuxedo designed for wedding occasions, featuring a patterned style in cream, tailored for a refined and modern look.","cream, patterned, wedding, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275960/Cream_Pattern_Tuxedo_nfv4jq.webp
Park Windowpane Charcoal Grey,Formal Collection,Suit,Grey,Slim,Windowpane,Business,Men,$312.22 ,Park Windowpane Charcoal Grey for Men | Premium Grey,"Park Windowpane Charcoal Grey designed for business occasions, featuring a windowpane style in grey, tailored for a refined and modern look.","grey, windowpane, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275959/Dark_Windowpane_Charcoal_Grey_xeyrtj.webp
Deep Red Double Breasted,Formal Collection,Double Breasted,Red,Slim,Classic,Wedding,Men,$332.22 ,Deep Red Double Breasted for Men | Premium Breasted,"Deep Red Double Breasted designed for wedding occasions, featuring a classic style in red, tailored for a refined and modern look.","red, classic, wedding, double breasted",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275958/Deep_Red_Double_Breasted_irenry.webp
Double Breasted Bold Red,Formal Collection,Double Breasted,Red,Slim,Bold,Evening,Women,$377.00 ,Double Breasted Bold Red for Men | Premium Red,"Double Breasted Bold Red designed for evening occasions, featuring a bold style in red, tailored for a refined and modern look.","red, bold, evening, double breasted",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275958/Double_Breasted_Bold_Red_i2h99b.webp
Double Breasted Offwhite Stripes,Wedding Collection,Double Breasted,Offwhite,Slim,Striped,Wedding,Men,$332.22 ,Double Breasted Offwhite Stripes for Men | Premium Stripes,"Double Breasted Offwhite Stripes designed for wedding occasions, featuring a striped style in offwhite, tailored for a refined and modern look.","offwhite, striped, wedding, double breasted",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275959/Double_Breasted_Offwhite_Stripes_jcz4pf.webp
Fine Red Pinstripe Single Breasted,Formal Collection,Suit,Red,Slim,Pinstripe,Business,Men,$312.22 ,Fine Red Pinstripe Single Breasted for Men | Premium Breasted,"Fine Red Pinstripe Single Breasted designed for business occasions, featuring a pinstripe style in red, tailored for a refined and modern look.","red, pinstripe, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275957/Fine_Red_Pinstripes_Single_Breasted_by11ev.webp
Green Pattern Tuxedo,Wedding Collection,Tuxedo,Green,Slim,Patterned,Evening,Men,$377.00 ,Green Pattern Tuxedo for Men | Premium Tuxedo,"Green Pattern Tuxedo designed for evening occasions, featuring a patterned style in green, tailored for a refined and modern look.","green, patterned, evening, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275951/Green_Pattern_Tuxedo_o2tker.webp
Grey Pattern Windowpane,Formal Collection,Suit,Grey,Slim,Windowpane,Business,Men,$312.22 ,Grey Pattern Windowpane for Men | Premium Windowpane,"Grey Pattern Windowpane designed for business occasions, featuring a windowpane style in grey, tailored for a refined and modern look.","grey, windowpane, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275950/Light_Grey_Single_Breasted_vb2jb1.webp
Light Beige Windowpane 3 Piece,Wedding Collection,Suit,Beige,Slim,Windowpane,Wedding,Men,$332.22 ,Light Beige Windowpane 3 Piece for Men | Premium Piece,"Light Beige Windowpane 3 Piece designed for wedding occasions, featuring a windowpane style in beige, tailored for a refined and modern look.","beige, windowpane, wedding, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275951/Light_Beige_WindowPane_3_pieces_p1qneq.webp
Light Grey Single Breasted,Formal Collection,Suit,Grey,Slim,Classic,Business,Men,$312.22 ,Light Grey Single Breasted for Men | Premium Breasted,"Light Grey Single Breasted designed for business occasions, featuring a classic style in grey, tailored for a refined and modern look.","grey, classic, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275950/Light_Grey_Single_Breasted_vb2jb1.webp
Nehru Suit Dark Brown,Wedding Collection,Ethnic,Brown,Slim,Nehru,Formal,Men,$377.00 ,Nehru Suit Dark Brown for Men | Premium Brown,"Nehru Suit Dark Brown designed for formal occasions, featuring a nehru style in brown, tailored for a refined and modern look.","brown, nehru, formal, ethnic",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275949/Nehru_Suit_Dark_Brown_zgkldo.webp
Nehru Suit Dark Purple,Wedding Collection,Ethnic,Purple,Slim,Nehru,Formal,Men,$377.00 ,Nehru Suit Dark Purple for Men | Premium Purple,"Nehru Suit Dark Purple designed for formal occasions, featuring a nehru style in purple, tailored for a refined and modern look.","purple, nehru, formal, ethnic",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275949/Nehru_Suit_Dark_Purple_bbbszl.webp
Offwhite Cream Single Breasted,Wedding Collection,Suit,Cream,Slim,Classic,Wedding,Men,$262.22 ,Offwhite Cream Single Breasted for Men | Premium Breasted,"Offwhite Cream Single Breasted designed for wedding occasions, featuring a classic style in cream, tailored for a refined and modern look.","cream, classic, wedding, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275948/Off-white_Cream_Stone_Single_Breasted_ymokmb.webp
Offwhite Baggy Single Breasted,Casual Collection,Suit,Offwhite,Loose,Relaxed,Casual,Women,$177.00 ,Offwhite Baggy Single Breasted for Men | Premium Breasted,"Offwhite Baggy Single Breasted designed for casual occasions, featuring a relaxed style in offwhite, tailored for a refined and modern look.","offwhite, relaxed, casual, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275939/Offwhite_Baggy_Single_Breasted_hjv6co.webp
Striped Double Breasted Navy Blue,Formal Collection,Double Breasted,Navy,Slim,Striped,Business,Men,$312.22 ,Striped Double Breasted Navy Blue for Men | Premium Blue,"Striped Double Breasted Navy Blue designed for business occasions, featuring a striped style in navy, tailored for a refined and modern look.","navy, striped, business, double breasted",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275938/Stripes_Double_Breasted_Navy_Blue_wlwka4.webp
Super Double Tuxedo Black,Wedding Collection,Tuxedo,Black,Slim,Luxury,Evening,Men,$377.00 ,Super Double Tuxedo Black for Men | Premium Black,"Super Double Tuxedo Black designed for evening occasions, featuring a luxury style in black, tailored for a refined and modern look.","black, luxury, evening, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275936/Super_Double_Tuxedo_iu82bo.webp
Teal Blue Single Breasted,Formal Collection,Suit,Teal,Slim,Classic,Business,Men,$312.22 ,Teal Blue Single Breasted for Men | Premium Breasted,"Teal Blue Single Breasted designed for business occasions, featuring a classic style in teal, tailored for a refined and modern look.","teal, classic, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275936/Teal_Blue_Single_Breasted_ylv3bi.webp
UltraFlex High-Rise Suit,Formal Collection,Suit,Grey,Slim,Modern,Business,Men,$312.22 ,UltraFlex High-Rise Suit for Men | Premium Suit,"UltraFlex High-Rise Suit designed for business occasions, featuring a modern style in grey, tailored for a refined and modern look.","grey, modern, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774275937/UltraFlex_High-Rise_e5ohhb.webp
Velvet Tuxedo Green,Wedding Collection,Tuxedo,Green,Slim,Velvet,Evening,Men,$377.00 ,Velvet Tuxedo Green for Men | Premium Green,"Velvet Tuxedo Green designed for evening occasions, featuring a velvet style in green, tailored for a refined and modern look.","green, velvet, evening, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774277286/Velvet_Tuxedo_green_dzbxkh.webp
Velvet Tuxedo Red,Wedding Collection,Tuxedo,Red,Slim,Velvet,Evening,Men,$377.00 ,Velvet Tuxedo Red for Men | Premium Red,"Velvet Tuxedo Red designed for evening occasions, featuring a velvet style in red, tailored for a refined and modern look.","red, velvet, evening, tuxedo",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774277367/Velvet_Tuxedo_red_nohgoq.webp
Wedding Shirt,Accessories,Shirt,White,Regular,Classic,Wedding,Men,$61.15 ,Wedding Shirt for Men | Premium Shirt,"Wedding Shirt designed for wedding occasions, featuring a classic style in white, tailored for a refined and modern look.","white, classic, wedding, shirt",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774277484/Wedding_Shirt_mdvmpw.webp
Windowpane Navy Blue,Formal Collection,Suit,Navy,Slim,Windowpane,Business,Men,$312.22 ,Windowpane Navy Blue for Men | Premium Blue,"Windowpane Navy Blue designed for business occasions, featuring a windowpane style in navy, tailored for a refined and modern look.","navy, windowpane, business, suit",https://res.cloudinary.com/dcy26s9jm/image/upload/v1774277580/WindowPane_Navy_Blue_Double_Breasted_qk3wbi.webp`;

function parseCSV(csv) {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    
    // Handle quoted values with commas
    const row = [];
    let inQuotes = false;
    let currentValue = '';
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    row.push(currentValue.trim());

    result.push({
      id: row[0].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: row[0],
      category: row[1],
      material: row[2],
      color: row[3],
      fit: row[4],
      style: row[5],
      occasion: row[6],
      gender: row[7],
      price: row[8],
      seoTitle: row[9],
      desc: row[10],
      tags: row[11].split(',').map(t => t.trim()),
      img: row[12],
      images: [row[12]],
      sizes: row[1] === "Wedding Collection" || row[1] === "Formal Collection" ? ["46", "48", "50", "52", "54", "56"] : (row[1] === "Casual Collection" ? ["S", "M", "L", "XL", "XXL"] : ["One Size"]),
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 30) + 5,
      reviews: [{ user: "Customer", rating: 5, text: "Excellent quality and fit." }]
    });
  }
  return result;
}

const products = parseCSV(csvData);
console.log(JSON.stringify(products, null, 2));
