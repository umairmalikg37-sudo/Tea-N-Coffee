// ==================== CAFE MENU DATA ====================
const menuItems = [
    { id: 1, name: "Coffee", category: "coffee", price: 850, image: "images/coffee-1.jpg", description: "Espresso with vanilla, caramel and steamed milk" },
    { id: 2, name: "Flat White", category: "coffee", price: 750, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400", description: "Smooth espresso with silky microfoam" },
    { id: 3, name: "Simple Tea", category: "tea", price: 800, image: "images/tea-1.jpg", description: "Premium Japanese matcha with steamed milk" },
    { id: 4, name: "Milk", category: "tea", price: 450, image: "images/milk-1.jpg", description: "Because great coffee needs great milk" },
    { id: 5, name: "Cardamom", category: "coffee", price: 700, image: "images/coffee-2.jpg", description: "Espresso with equal parts steamed milk and foam" },
    { id: 6, name: "Kashmiri Tea", category: "tea", price: 550, image: "images/tea-2.jpg", description: "Classic bergamot infused black tea" },
    { id: 7, name: "Red Velvet Cake", category: "desserts", price: 650, image: "https://images.unsplash.com/photo-1586788224331-947f68671cf1?w=400", description: "Moist cake with cream cheese frosting" },
    { id: 8, name: "Americano", category: "coffee", price: 600, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400", description: "Espresso with hot water" }
];

// ==================== BAKERY DATA ====================
const bakeryItems = [
    { id: 101, name: "Sourdough Bread", price: 550, image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400", description: "Artisan sourdough, crispy crust, soft inside" },
    { id: 102, name: "Butter Croissant", price: 350, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400", description: "Classic French butter croissant" },
    { id: 103, name: "Cinnamon Roll", price: 400, image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400", description: "Warm roll with cream cheese glaze" },
    { id: 104, name: "Birthday Cake", price: 2500, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", description: "Custom design birthday cake" }
];

// ==================== GIFTING HAMPERS DATA ====================
const giftingItems = [
    { id: 201, name: "Premium Coffee Hamper", price: 3500, image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400", description: "Artisan coffee beans, mug, and cookies" },
    { id: 202, name: "Skincare Essentials", price: 4200, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", description: "Natural skincare products gift set" },
    { id: 203, name: "Bakery Delight", price: 2800, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400", description: "Assorted pastries and cookies" },
    { id: 204, name: "Tea Lover's Hamper", price: 3900, image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400", description: "Premium teas, honey, and teapot" }
];

// ==================== BLOG POSTS DATA ====================
const blogPosts = [
    { id: 301, title: "8 Signs You Are Using the Wrong Cleanser", author: "Fatima Kundi", date: "25 April 2026", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600", excerpt: "Discover the signs that your current cleanser might be damaging your skin...", category: "Skincare" },
    { id: 302, title: "5 Ways to Use Aloe Vera Gel for Glowing Skin", author: "Fatima Kundi", date: "20 April 2026", image: "https://images.unsplash.com/photo-1620916566390-2f84a1c7a5b5?w=600", excerpt: "Aloe vera is nature's gift for skincare. Here are 5 amazing ways to use it...", category: "Skincare" },
    { id: 303, title: "How to Make Perfect Sourdough at Home", author: "Chef Ahmad", date: "15 April 2026", image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=600", excerpt: "Master the art of sourdough baking with our step-by-step guide...", category: "Baking" },
    { id: 304, title: "Our New Spring Menu is Here!", author: "Springs Team", date: "10 April 2026", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600", excerpt: "Check out our exciting new seasonal offerings...", category: "Cafe" }
];

// ==================== Helper Functions ====================
function formatPrice(price) {
    return `PKR ${price.toLocaleString()}`;
}

function renderMenuItems(category = "all") {
    const filtered = category === "all" ? menuItems : menuItems.filter(item => item.category === category);
    const grid = document.getElementById("menuGrid");
    if (!grid) return;
    
    grid.innerHTML = filtered.map(item => `
        <div class="product-card" data-id="${item.id}" data-type="menu">
            <img src="${item.image}" alt="${item.name}">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="product-footer">
                    <span class="price">${formatPrice(item.price)}</span>
                    <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-type="menu">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function renderBakeryItems() {
    const grid = document.getElementById("bakeryGrid");
    if (!grid) return;
    
    grid.innerHTML = bakeryItems.map(item => `
        <div class="product-card" data-id="${item.id}" data-type="bakery">
            <img src="${item.image}" alt="${item.name}">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="product-footer">
                    <span class="price">${formatPrice(item.price)}</span>
                    <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-type="bakery">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function renderGiftingItems() {
    const grid = document.getElementById("giftingGrid");
    if (!grid) return;
    
    grid.innerHTML = giftingItems.map(item => `
        <div class="product-card" data-id="${item.id}" data-type="gift">
            <img src="${item.image}" alt="${item.name}">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="product-footer">
                    <span class="price">${formatPrice(item.price)}</span>
                    <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-type="gift">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function renderBlogPosts() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;
    
    grid.innerHTML = blogPosts.map(post => `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Read More →</a>
            </div>
        </div>
    `).join("");
}