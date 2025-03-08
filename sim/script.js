document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    // Mobile menu toggle
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle("toggle");
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    // Product data (prices in USD)
    const products = [
        {
            name: "UltraWhey Pro",
            price: 59.99, // USD
            image: "img/whey-pro.webp",
        },
        {
            name: "PowerBoost Pre-Workout",
            price: 49.99, // USD
            image: "img/POW-Peach-Nectar-Tub-Thumbnail-copy_750x.webp",
        },
        {
            name: "AminoMax BCAA",
            price: 39.99, // USD
            image: "img/51RWAutJHmL.webp",
        },
        {
            name: "CreaPure Creatine",
            price: 29.99, // USD
            image: "img/1698169892-transparent-65380413513d0.webp",
        },
        {
            name: "Protein Bars (Pack of 12)",
            price: 24.99, // USD
            image: "img/protein-bars.webp",
        },
        {
            name: "Mass Gainer",
            price: 69.99, // USD
            image: "img/mass-gainer.webp",
        },
        {
            name: "Fat Burner Capsules",
            price: 34.99, // USD
            image: "img/fat-burner.webp",
        },
        {
            name: "Glutamine Powder",
            price: 19.99, // USD
            image: "img/glutamine.webp",
        },
        {
            name: "Energy Drink Mix",
            price: 14.99, // USD
            image: "img/energy-drink-mix.webp",
        },
        {
            name: "Collagen Peptides",
            price: 44.99, // USD
            image: "img/collagen-peptides.webp",
        },
    ];

    // Exchange rate (1 USD = 83 INR)
    const exchangeRate = 83;

    // Cart functionality
    const cart = [];
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Function to convert USD to INR
    function convertToRupees(usd) {
        return usd * exchangeRate;
    }

    // Function to format INR price
    function formatRupees(amount) {
        return `₹${amount.toFixed(2)}`;
    }

    // Update cart UI
    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.name} - ${formatRupees(convertToRupees(item.price))}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });
        cartTotal.textContent = `Total: ${formatRupees(convertToRupees(total))}`;
    }

    // Remove item from cart
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Populate products
    const productGrid = document.querySelector(".product-grid");
    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatRupees(convertToRupees(product.price))}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productItem);

        const addToCartButton = productItem.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => {
            cart.push({ name: product.name, price: product.price });
            updateCart();
        });
    });

    // Form submission
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for your message. We will get back to you soon!");
        contactForm.reset();
    });

    const newsletterForm = document.getElementById("newsletter-form");
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for subscribing to our newsletter!");
        newsletterForm.reset();
    });

    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
        const heroImage = document.querySelector(".hero-image");
        const scrollPosition = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Animate on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(".product-item, .about-content, .contact-form");
        elements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                element.classList.add("animate");
            }
        });
    };

    window.addEventListener("scroll", animateOnScroll);
});