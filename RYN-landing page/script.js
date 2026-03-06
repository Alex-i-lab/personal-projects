lucide.createIcons();

// Cart Management
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
        this.updateBagCount();
    }

    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateBagCount();
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
        this.updateBagCount();
    }

    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateBagCount() {
        const bagBtn = document.querySelector('[data-bag-button]');
        if (bagBtn) {
            bagBtn.textContent = `Bag (${this.getItemCount()})`;
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateBagCount();
    }
}

const cart = new ShoppingCart();

function loadStaticImages() {
    const imageAssets = [
        'assets/download (1).png',
        'assets/download (2).png',
        'assets/download (3).png',
        'assets/download (4).png',
        'assets/download (5).png',
        'assets/download (6).png',
        'assets/download (7).png',
        'assets/download (8).png',
        'assets/download (9).png',
        'assets/download (10).png',
        'assets/download (11).png',
        'assets/Gemini_Generated_Image_3j95y53j95y53j95.png'
    ];

    const containerIds = [
        'hero-image-container',
        'drop-1-img',
        'drop-2-img',
        'trend-1',
        'trend-2',
        'trend-3',
        'trend-4',
        'trend-5',
        'trend-6',
        'trend-7',
        'trend-8',
        'shop-1',
        'shop-2',
        'shop-3',
        'shop-4',
        'shop-5',
        'shop-6'
    ];

    containerIds.forEach((id, index) => {
        const container = document.getElementById(id);
        if (!container) return;

        const imageIndex = index % imageAssets.length;
        const imageSrc = imageAssets[imageIndex];
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.className = "w-full h-full object-cover transition-opacity duration-1000 opacity-0";
        img.onload = () => img.style.opacity = '1';
        img.onerror = () => {
            container.classList.add('bg-zinc-100');
        };
        
        container.innerHTML = '';
        container.appendChild(img);
        container.classList.remove('loading-shimmer');
    });
}

function setupAddToCartButtons() {
    document.querySelectorAll('[data-add-to-cart]').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('[data-product]');
            if (!productCard) return;

            const product = {
                id: productCard.dataset.product,
                name: productCard.dataset.name,
                price: parseFloat(productCard.dataset.price),
                image: productCard.dataset.image
            };

            cart.addItem(product);
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.classList.add('bg-green-600');
            this.classList.remove('bg-zinc-900');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('bg-green-600');
                this.classList.add('bg-zinc-900');
            }, 1500);
        });
    });
}

function setupBagButton() {
    const bag = document.querySelector('[data-bag-button]');
    if (bag) {
        bag.addEventListener('click', () => {
            window.location.href = 'purchases.html';
        });
        cart.updateBagCount();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadStaticImages();
    setupAddToCartButtons();
    setupBagButton();
});
