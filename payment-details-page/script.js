// Grab form and input elements
const form = document.querySelector('form');
const cardholderName = document.getElementById('name');
const cardNumber = document.getElementById('card-number');
const expMonth = document.getElementById('exp-month');
const expYear = document.getElementById('exp-year');
const cvv = document.getElementById('cvv');
const zipCode = document.getElementById('zip');
const paypalLink = document.querySelector('.options a');
const cardLink = document.getElementById('card');
const subscribeButton = document.querySelector('#button-container button');

// Format card number as user types
cardNumber.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Validate CVV on blur
cvv.addEventListener('blur', function () {
    if (cvv.value.length < 3 || cvv.value.length > 4 || /\D/.test(cvv.value)) {
        alert('CVV must be 3 or 4 digits');
    }
});

// Handle PayPal link click
paypalLink.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Redirecting to PayPal...');
});

// Handle card image click (optional interaction)
cardLink.addEventListener('click', function (e) {
    e.preventDefault();
    alert('You selected Credit Card as your payment method');
});

// Helper function to check required fields
function validateFields() {
    let isValid = true;

    const inputs = [cardholderName, cardNumber, expMonth, expYear, cvv, zipCode];

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Handle form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateFields()) {
        alert('Please fill in all fields correctly');
        return;
    }

    // You could send data to a server here using fetch() if needed
    alert('Payment processed successfully! 🎉');
    form.reset(); // clear the form after successful "payment"
});
