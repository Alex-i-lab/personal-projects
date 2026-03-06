lucide.createIcons();

// Cart Management - Same as in script.js
class ShoppingCart {
    constructor() {
        this.storageKey = 'ryn-shopping-cart';
        this.cart = this.loadCart();
    }

    loadCart() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    }

    addItem(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        this.saveCart();
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }
}

const cart = new ShoppingCart();

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const emptCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    const cartCount = document.getElementById('cart-count');

    cartCount.textContent = cart.getItemCount();

    if (cart.cart.length === 0) {
        container.innerHTML = '';
        emptCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    emptCart.style.display = 'none';
    cartSummary.style.display = 'block';

    container.innerHTML = cart.cart.map(item => `
        <div class="glass-card p-6 rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex-1 w-full md:w-auto">
                <h3 class="text-lg font-black italic uppercase tracking-tighter mb-2">${item.name}</h3>
                <p class="text-zinc-400 text-xs font-bold uppercase tracking-widest">Product ID: ${item.id}</p>
            </div>
            
            <div class="flex items-center gap-4">
                <div class="flex items-center border border-zinc-200 rounded-xl overflow-hidden">
                    <button onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})" class="px-4 py-2 hover:bg-zinc-100 transition-colors">
                        <i data-lucide="minus" class="w-4 h-4"></i>
                    </button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateItemQuantity('${item.id}', parseInt(this.value))" class="w-12 text-center font-bold border-l border-r border-zinc-200 focus:outline-none">
                    <button onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})" class="px-4 py-2 hover:bg-zinc-100 transition-colors">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                    </button>
                </div>
                <span class="font-black text-lg tracking-tighter w-20 text-right">$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeItem('${item.id}')" class="p-3 hover:bg-red-50 rounded-xl transition-colors">
                    <i data-lucide="trash-2" class="w-5 h-5 text-red-600"></i>
                </button>
            </div>
        </div>
    `).join('');

    updateSummary();
    lucide.createIcons();
}

function updateItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(productId);
    } else {
        cart.updateQuantity(productId, newQuantity);
        renderCart();
    }
}

function removeItem(productId) {
    cart.removeItem(productId);
    renderCart();
}

function updateSummary() {
    const subtotal = cart.getTotal();
    const shipping = subtotal > 0 ? 15 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping').textContent = shipping.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    document.getElementById('checkout-btn').disabled = cart.cart.length === 0;
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.cart.length > 0) {
        alert('Thank you for your order! Your order has been placed successfully.\n\nOrder Total: $' + cart.getTotal().toFixed(2) + '\n\nWe will process your order shortly.');
        cart.clearCart();
        renderCart();
    }
});

window.addEventListener('DOMContentLoaded', renderCart);
