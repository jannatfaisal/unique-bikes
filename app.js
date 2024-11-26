function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const icons = document.querySelector('.icons');

    navLinks.classList.toggle('active');
    icons.classList.toggle('active');
}

function applyColorFilter(color) {
    const mainImage = document.getElementById("mainImage");

    if (color === 'black') {
        mainImage.style.filter = 'brightness(0.4) contrast(1) saturate(0%)';
    } else if (color === 'white') {
        mainImage.style.filter = 'invert(1)';
    } else if (color === 'gray') {
        mainImage.style.filter = 'grayscale(100%)';
    } else {
        mainImage.style.filter = 'none';
    }
}

const bikeWeights = {
    small: "12 kg",
    medium: "14.18KG",
    large: "18 kg"
};

function changeSize(size) {
    const mainImage = document.getElementById("mainImage");
    const weightElement = document.getElementById("weight");

    if (size === 'small') {
        mainImage.style.transform = 'scale(0.9)';
    } else if (size === 'medium') {
        mainImage.style.transform = 'scale(1)';
    } else if (size === 'large') {
        mainImage.style.transform = 'scale(1.1)';
    }

    weightElement.innerText = `Weight: ${bikeWeights[size]}`;
}

const bikePrices = {
    bike1: "$2,500",
    bike2: "$2,700",
    bike3: "$3,000"
};

function changeImage(imageSrc, bikeId) {
    const mainImage = document.getElementById("mainImage");
    mainImage.src = imageSrc;

    const priceElement = document.getElementById("price");

    if (bikePrices[bikeId]) {
        priceElement.innerText = `Price: ${bikePrices[bikeId]}`;
    } else {
        console.error(`No price found for bikeId: ${bikeId}`);
        priceElement.innerText = "Price: Not available";
    }
}

let cart = [];

function addToCart(bikeId) {
    const cartMessage = document.getElementById("cartMessage");

    cart.push(bikeId);

    updateCartCount();

    cartMessage.style.display = "block";
    setTimeout(() => {
        cartMessage.style.display = "none";
    }, 500);
}

function updateCartCount() {
    const cartIcon = document.querySelector(".bi-cart2");
    const itemCount = cart.length;
    cartIcon.setAttribute("data-count", itemCount);
}

function showCart() {
    const cartContent = document.getElementById("cartContent");
    cartContent.innerHTML = "";

    if (cart.length === 0) {
        cartContent.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((bikeId, index) => {
            const itemElement = document.createElement("p");
            itemElement.innerText = `Item ${index + 1}: ${bikePrices[bikeId]}`;
            cartContent.appendChild(itemElement);
        });
    }
    cartContent.style.display = "block";
}

document.addEventListener("click", (e) => {
    const cartContent = document.getElementById("cartContent");
    const isClickInside = e.target.closest(".bi-cart2") || e.target.closest("#cartContent");

    if (!isClickInside) {
        cartContent.style.display = "none";
    }
});

let currentIndex = 0;
const imagesToShow = 3;

function moveSlide(step, sliderId) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelector('.slides');
    const images = slides.querySelectorAll('img');

    currentIndex += step;
    if (currentIndex < 0) {
        currentIndex = images.length - imagesToShow;
    } else if (currentIndex > images.length - imagesToShow) {
        currentIndex = 0;
    }

    const offset = currentIndex * (45 / imagesToShow);
    slides.style.transform = `translateX(-${offset}%)`;
}

function showContent(tab) {
    document.getElementById('description').style.display = 'none';
    document.getElementById('specs').style.display = 'none';

    document.querySelectorAll('.tab').forEach(tabElement => {
        tabElement.classList.remove('active');
    });

    document.getElementById(tab).style.display = 'block';
    document.querySelector(`.tab[onclick="showContent('${tab}')"]`).classList.add('active');
}

showContent('description');
