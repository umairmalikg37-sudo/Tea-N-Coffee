// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ==================== DARK MODE ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== BACK TO TOP ====================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== MENU TABS ====================
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');
            renderMenuItems(category);
        });
    });
}

// ==================== SHOPPING CART ====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image || 'https://placehold.co/70x70'}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" data-id="${item.id}" data-change="-1">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
            `).join('');
        }
    }
    
    if (cartTotalSpan) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalSpan.textContent = formatPrice(total);
    }
}

function addToCart(id, name, price, type, image = null) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, type, quantity: 1, image });
    }
    saveCart();
    showNotification(`${name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
        }
    }
}

// Event delegation for cart buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
        const btn = e.target.closest('.add-to-cart');
        const id = parseInt(btn.getAttribute('data-id'));
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));
        const type = btn.getAttribute('data-type');
        const img = btn.closest('.product-card')?.querySelector('img')?.src;
        addToCart(id, name, price, type, img);
    }
    
    if (e.target.classList.contains('cart-item-remove') || e.target.closest('.cart-item-remove')) {
        const btn = e.target.closest('.cart-item-remove');
        const id = parseInt(btn.getAttribute('data-id'));
        removeFromCart(id);
    }
    
    if (e.target.classList.contains('qty-btn') || e.target.closest('.qty-btn')) {
        const btn = e.target.closest('.qty-btn');
        const id = parseInt(btn.getAttribute('data-id'));
        const change = parseInt(btn.getAttribute('data-change'));
        updateQuantity(id, change);
    }
});

// ==================== CART SIDEBAR ====================
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');

if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });
}

if (closeCart) {
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });
}

// ==================== NOTIFICATION ====================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==================== SEARCH FUNCTIONALITY ====================
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query === '') return;
    
    // Search in menu, bakery, and gifting items
    const allProducts = [...menuItems, ...bakeryItems, ...giftingItems];
    const results = allProducts.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
    );
    
    if (results.length > 0) {
        showNotification(`Found ${results.length} results for "${query}"`);
        // Scroll to products section
        document.getElementById('cafe')?.scrollIntoView({ behavior: 'smooth' });
    } else {
        showNotification(`No results found for "${query}"`);
    }
}

if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
}
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// ==================== NEWSLETTER SUBSCRIPTION ====================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            showNotification(`Subscribed with ${email}! Thank you.`);
            newsletterForm.reset();
        }
    });
}

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We will get back to you soon.');
        contactForm.reset();
    });
}

// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    }
});

// ==================== SMOOTH SCROLL FOR ALL LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Render all sections
    if (typeof renderMenuItems !== 'undefined') renderMenuItems('all');
    if (typeof renderBakeryItems !== 'undefined') renderBakeryItems();
    if (typeof renderGiftingItems !== 'undefined') renderGiftingItems();
    if (typeof renderBlogPosts !== 'undefined') renderBlogPosts();
    
    // Update cart UI
    updateCartUI();
});

// ==================== ANIMATION ON SCROLL ====================
const animateElements = document.querySelectorAll('.feature, .product-card, .blog-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});