/**
 * Internet-magazine: Promotions (Акции) Page Script
 * Fully handles interactive behaviors, cart, wishlist, carousel slider, search, and modals.
 */

// Global State
const state = {
    cart: {
        // Pre-loaded with product 4 (Сок Идеал тыквенно-апельсиновый, qty: 1) as shown in the screenshot
        4: {
            id: 4,
            name: 'Сок Идеал тыквенно-апельсиновый, 1л',
            price: 70.90,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80'
        }
    },
    // Product 2 has active red heart as shown in screenshot
    wishlist: new Set([2]),
    products: [
        {
            id: 1,
            name: 'Гранола Мюсли BioNova ягодные запечённые хрустящие, 400г',
            price: 99.90,
            oldPrice: 125.00,
            stock: 'В наличии: 2 шт',
            image: 'https://images.unsplash.com/photo-1517093709142-f59796853874?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 2,
            name: 'Сок Идеал тыквенно-апельсиновый, 1л',
            price: 70.90,
            oldPrice: null,
            stock: 'В наличии: 11 шт',
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 3,
            name: 'Гранола Мюсли BioNova ягодные запечённые хрустящие, 400г',
            price: 99.90,
            oldPrice: null,
            stock: 'Осталось мало',
            image: 'https://images.unsplash.com/photo-1517093709142-f59796853874?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 4,
            name: 'Сок Идеал тыквенно-апельсиновый, 1л',
            price: 70.90,
            oldPrice: null,
            stock: 'В наличии: 4 шт',
            image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80'
        }
    ]
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
    initHeaderCart();
    initWishlistBadge();
    initCategoryPills();
    initProductSlider();
    initSearch();
    initDeliveryModal();
    initCartModal();
});

// Toast Notification Utility
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium border ${
        type === 'success' 
            ? 'bg-gray-900 text-white border-gray-800' 
            : 'bg-red-600 text-white border-red-700'
    }`;
    
    const icon = type === 'success' 
        ? '<i class="fa-solid fa-circle-check text-green-400"></i>' 
        : '<i class="fa-solid fa-circle-exclamation text-yellow-300"></i>';

    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto remove after 3.2 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// ----------------------------------------
// CART FUNCTIONS
// ----------------------------------------

function initHeaderCart() {
    updateHeaderCartCount();
}

function updateHeaderCartCount() {
    const totalCount = Object.values(state.cart).reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.getElementById('headerCartCount');
    if (countEl) {
        countEl.textContent = totalCount;
        countEl.classList.toggle('animate-pulse', totalCount > 0);
    }
}

function addToCart(productId, name, price, btnElement) {
    const product = state.products.find(p => p.id === productId);
    const imgUrl = product ? product.image : '';

    if (!state.cart[productId]) {
        state.cart[productId] = {
            id: productId,
            name: name,
            price: price,
            quantity: 1,
            image: imgUrl
        };
    } else {
        state.cart[productId].quantity += 1;
    }

    renderProductCardButton(productId);
    updateHeaderCartCount();
    showToast(`Товар добавлен в корзину: ${name}`);
}

function increaseQty(productId) {
    if (state.cart[productId]) {
        state.cart[productId].quantity += 1;
        renderProductCardButton(productId);
        updateHeaderCartCount();
        renderCartModalItems();
    }
}

function decreaseQty(productId) {
    if (state.cart[productId]) {
        state.cart[productId].quantity -= 1;
        if (state.cart[productId].quantity <= 0) {
            delete state.cart[productId];
            showToast('Товар удален из корзины');
        }
        renderProductCardButton(productId);
        updateHeaderCartCount();
        renderCartModalItems();
    }
}

function renderProductCardButton(productId) {
    const container = document.querySelector(`.cart-action-container[data-item-id="${productId}"]`);
    if (!container) return;

    const item = state.cart[productId];
    if (item && item.quantity > 0) {
        // Show Stepper (- qty +)
        container.innerHTML = `
            <div class="flex items-center bg-[#FFBE1A] text-gray-900 rounded-full px-3 py-1 font-bold text-xs sm:text-sm select-none gap-2 shadow-xs transition-transform transform scale-100">
                <button onclick="decreaseQty(${productId})" class="w-5 h-5 flex items-center justify-center hover:bg-black/10 rounded-full text-base leading-none transition">−</button>
                <span class="qty-val px-1">${item.quantity}</span>
                <button onclick="increaseQty(${productId})" class="w-5 h-5 flex items-center justify-center hover:bg-black/10 rounded-full text-base leading-none transition">+</button>
            </div>
        `;
    } else {
        // Revert to "В корзину" button
        const product = state.products.find(p => p.id === productId);
        const name = product ? product.name : '';
        const price = product ? product.price : 0;
        
        // Product 3 has a solid red button by default in screenshot, others have outline
        const isSolid = productId === 3;
        const btnClasses = isSolid 
            ? 'px-4 py-1.5 rounded-full bg-[#E31E24] text-white hover:bg-[#C9161B] font-semibold text-xs sm:text-sm transition-all duration-200 shadow-xs'
            : 'px-4 py-1.5 rounded-full border border-[#E31E24] text-[#E31E24] hover:bg-[#E31E24] hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200';

        container.innerHTML = `
            <button onclick="addToCart(${productId}, '${name}', ${price}, this)" class="${btnClasses}">
                В корзину
            </button>
        `;
    }
}

// ----------------------------------------
// WISHLIST FUNCTIONS
// ----------------------------------------

function initWishlistBadge() {
    updateWishlistBadge();
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistCount');
    if (!badge) return;
    const count = state.wishlist.size;
    badge.textContent = count;
    if (count > 0) {
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function toggleWishlist(productId, btnElement) {
    const icon = btnElement.querySelector('i');
    const product = state.products.find(p => p.id === productId);
    const productName = product ? product.name : 'Товар';

    if (state.wishlist.has(productId)) {
        state.wishlist.delete(productId);
        btnElement.classList.remove('text-[#E31E24]');
        btnElement.classList.add('text-gray-300');
        icon.className = 'fa-regular fa-heart';
        showToast(`Удалено из избранного: ${productName}`);
    } else {
        state.wishlist.add(productId);
        btnElement.classList.remove('text-gray-300');
        btnElement.classList.add('text-[#E31E24]', 'heart-active');
        icon.className = 'fa-solid fa-heart';
        setTimeout(() => btnElement.classList.remove('heart-active'), 400);
        showToast(`Добавлено в избранное: ${productName}`);
    }

    updateWishlistBadge();
}

// ----------------------------------------
// CATEGORY PILLS SWITCHER
// ----------------------------------------

function initCategoryPills() {
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active classes from all
            pills.forEach(p => {
                p.classList.remove('active-pill', 'bg-[#FFE8CC]', 'text-[#9A3412]', 'border-2', 'border-[#FDBA74]', 'font-semibold');
            });

            // Set active on clicked
            pill.classList.add('active-pill', 'bg-[#FFE8CC]', 'text-[#9A3412]', 'border-2', 'border-[#FDBA74]', 'font-semibold');

            const title = pill.querySelector('span:last-child')?.textContent?.trim();
            showToast(`Категория: ${title}`);
        });
    });
}

// ----------------------------------------
// PRODUCT CAROUSEL / SLIDER
// ----------------------------------------

function initProductSlider() {
    const carousel = document.getElementById('productCarousel');
    const prevBtn = document.getElementById('sliderPrevBtn');
    const nextBtn = document.getElementById('sliderNextBtn');

    if (!carousel || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });
}

// ----------------------------------------
// SEARCH FUNCTIONALITY
// ----------------------------------------

function initSearch() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchDropdown');

    if (!input || !dropdown) return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            dropdown.classList.add('hidden');
            dropdown.innerHTML = '';
            return;
        }

        const filtered = state.products.filter(p => p.name.toLowerCase().includes(query));

        if (filtered.length > 0) {
            dropdown.innerHTML = filtered.map(p => `
                <div onclick="selectSearchProduct(${p.id})" class="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition">
                    <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-contain rounded">
                    <div class="flex-1 min-w-0">
                        <div class="text-xs font-semibold text-gray-900 truncate">${p.name}</div>
                        <div class="text-xs font-bold text-[#E31E24]">${p.price.toFixed(2)} грн</div>
                    </div>
                </div>
            `).join('');
            dropdown.classList.remove('hidden');
        } else {
            dropdown.innerHTML = `
                <div class="p-4 text-center text-xs text-gray-400">Ничего не найдено</div>
            `;
            dropdown.classList.remove('hidden');
        }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

function selectSearchProduct(productId) {
    const product = state.products.find(p => p.id === productId);
    const dropdown = document.getElementById('searchDropdown');
    const input = document.getElementById('searchInput');
    if (dropdown) dropdown.classList.add('hidden');
    if (input && product) input.value = product.name;

    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('ring-2', 'ring-[#E31E24]', 'ring-offset-2');
        setTimeout(() => card.classList.remove('ring-2', 'ring-[#E31E24]', 'ring-offset-2'), 2000);
    }
}

// ----------------------------------------
// MODALS (Delivery & Cart)
// ----------------------------------------

function initDeliveryModal() {
    const btn = document.getElementById('deliveryBtn');
    const modal = document.getElementById('deliveryModal');
    const closeBtn = document.getElementById('closeDeliveryModalBtn');

    if (!btn || !modal) return;

    btn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
        }, 10);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeDeliveryModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeDeliveryModal();
    });
}

function closeDeliveryModal() {
    const modal = document.getElementById('deliveryModal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function initCartModal() {
    const cartBtn = document.getElementById('headerCartBtn');
    const modal = document.getElementById('cartModal');
    const closeBtn = document.getElementById('closeCartBtn');

    if (!cartBtn || !modal) return;

    cartBtn.addEventListener('click', () => {
        renderCartModalItems();
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('.transform').classList.remove('translate-x-full');
        }, 10);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeCartModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCartModal();
    });
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    modal.querySelector('.transform').classList.add('translate-x-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function renderCartModalItems() {
    const list = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalPrice');
    if (!list || !totalEl) return;

    const items = Object.values(state.cart);

    if (items.length === 0) {
        list.innerHTML = `
            <div class="py-12 text-center text-gray-400">
                <i class="fa-solid fa-basket-shopping text-4xl mb-3 text-gray-200"></i>
                <p class="text-sm font-medium">Ваша корзина пуста</p>
            </div>
        `;
        totalEl.textContent = '0.00 грн';
        return;
    }

    let total = 0;
    list.innerHTML = items.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="py-3 flex items-center justify-between gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain rounded-lg">
                <div class="flex-1 min-w-0">
                    <h5 class="text-xs font-semibold text-gray-900 truncate">${item.name}</h5>
                    <div class="text-xs text-gray-500">${item.price.toFixed(2)} грн / шт</div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs font-bold">
                        <button onclick="decreaseQty(${item.id})" class="w-4 h-4 flex items-center justify-center hover:text-red-500">−</button>
                        <span class="px-2">${item.quantity}</span>
                        <button onclick="increaseQty(${item.id})" class="w-4 h-4 flex items-center justify-center hover:text-green-500">+</button>
                    </div>
                    <span class="text-xs font-bold text-gray-900 w-16 text-right">${itemTotal.toFixed(2)} грн</span>
                </div>
            </div>
        `;
    }).join('');

    totalEl.textContent = `${total.toFixed(2)} грн`;
}

function checkout() {
    const count = Object.values(state.cart).reduce((s, i) => s + i.quantity, 0);
    if (count === 0) {
        showToast('Добавьте товары в корзину перед оформлением!', 'error');
        return;
    }
    showToast('Переходим к оформлению заказа...');
    closeCartModal();
}

// ----------------------------------------
// PROMOTION ACTIONS
// ----------------------------------------

function handlePromoClick(promoName) {
    showToast(`Переход к спецпредложению: «${promoName}»`);
    const target = document.querySelector('section:nth-of-type(2)');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

// ----------------------------------------
// FEEDBACK & NEWSLETTER FORMS
// ----------------------------------------

function handleRequestSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('linkInput');
    const selectedType = document.querySelector('input[name="requestType"]:checked')?.value || 'товар';

    if (input && input.value.trim()) {
        showToast(`Спасибо! Ссылка на ${selectedType} отправлена: «${input.value.trim()}»`);
        input.value = '';
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input && input.value.trim()) {
        showToast(`Спасибо за подписку! Письмо отправлено на: ${input.value.trim()}`);
        input.value = '';
    }
}
