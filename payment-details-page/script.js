const cardHolder = document.getElementById('name');
console.log(cardHolder);
cardHolder.placeholder = 'John Doe';

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const conf = document.getElementById('confirmation');
    conf.style.display = 'block';
    setTimeout(() => conf.classList.add('confirmation-visible'), 10);
    document.querySelector('.checkout-form').style.display = 'none';
});

