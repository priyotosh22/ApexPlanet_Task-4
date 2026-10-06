/* ==================================================
   PRODUCT DATA
================================================== */

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        rating: 4.6,
        icon: "🎧",
        description:
            "Comfortable wireless headphones with clear audio and long battery life."
    },

    {
        id: 2,
        name: "Mechanical Keyboard",
        category: "Electronics",
        price: 3499,
        rating: 4.8,
        icon: "⌨️",
        description:
            "Responsive mechanical keyboard designed for work and gaming."
    },

    {
        id: 3,
        name: "Smart Watch",
        category: "Electronics",
        price: 4999,
        rating: 4.5,
        icon: "⌚",
        description:
            "Feature-rich smartwatch with fitness tracking and notifications."
    },

    {
        id: 4,
        name: "Classic Denim Jacket",
        category: "Fashion",
        price: 2199,
        rating: 4.3,
        icon: "🧥",
        description:
            "Timeless denim jacket designed for comfortable everyday wear."
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "Fashion",
        price: 2899,
        rating: 4.7,
        icon: "👟",
        description:
            "Lightweight running shoes with comfortable cushioning and support."
    },

    {
        id: 6,
        name: "Minimal Backpack",
        category: "Fashion",
        price: 1799,
        rating: 4.4,
        icon: "🎒",
        description:
            "Minimal everyday backpack with dedicated laptop storage."
    },

    {
        id: 7,
        name: "Leather Wallet",
        category: "Accessories",
        price: 999,
        rating: 4.2,
        icon: "👛",
        description:
            "Compact wallet with multiple card slots and a premium finish."
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "Accessories",
        price: 1299,
        rating: 4.1,
        icon: "🕶️",
        description:
            "Classic sunglasses with a lightweight frame and modern design."
    },

    {
        id: 9,
        name: "Desk Lamp",
        category: "Home",
        price: 1599,
        rating: 4.5,
        icon: "💡",
        description:
            "Modern LED desk lamp suitable for study and work spaces."
    },

    {
        id: 10,
        name: "Coffee Maker",
        category: "Home",
        price: 5999,
        rating: 4.7,
        icon: "☕",
        description:
            "Compact coffee maker designed for convenient home brewing."
    },

    {
        id: 11,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1999,
        rating: 4.4,
        icon: "🔊",
        description:
            "Portable speaker delivering balanced sound with wireless connectivity."
    },

    {
        id: 12,
        name: "Smart LED Bulb",
        category: "Home",
        price: 799,
        rating: 4.0,
        icon: "💡",
        description:
            "Energy-efficient smart bulb with adjustable brightness."
    }

];


/* ==================================================
   DOM ELEMENTS
================================================== */

const productGrid =
    document.getElementById("productGrid");

const productCount =
    document.getElementById("productCount");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceFilter =
    document.getElementById("priceFilter");

const priceValue =
    document.getElementById("priceValue");

const ratingFilter =
    document.getElementById("ratingFilter");

const sortFilter =
    document.getElementById("sortFilter");

const resetFilters =
    document.getElementById("resetFilters");

const emptyReset =
    document.getElementById("emptyReset");


/* ==================================================
   FILTER STATE
================================================== */

let filters = {

    search: "",

    category: "all",

    maxPrice: 10000,

    minRating: 0,

    sort: "default"

};


/* ==================================================
   FORMAT PRICE
================================================== */

function formatPrice(price) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 0

    }).format(price);

}


/* ==================================================
   FILTER PRODUCTS
================================================== */

function filterProducts() {

    let filteredProducts =
        [...products];


    /* SEARCH */

    if (filters.search !== "") {

        filteredProducts =
            filteredProducts.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(
                        filters.search.toLowerCase()
                    )

            );

    }


    /* CATEGORY */

    if (filters.category !== "all") {

        filteredProducts =
            filteredProducts.filter(product =>

                product.category === filters.category

            );

    }


    /* PRICE */

    filteredProducts =
        filteredProducts.filter(product =>

            product.price <= filters.maxPrice

        );


    /* RATING */

    filteredProducts =
        filteredProducts.filter(product =>

            product.rating >= filters.minRating

        );


    /* SORT */

    switch (filters.sort) {

        case "price-low":

            filteredProducts.sort(
                (a, b) => a.price - b.price
            );

            break;


        case "price-high":

            filteredProducts.sort(
                (a, b) => b.price - a.price
            );

            break;


        case "rating-high":

            filteredProducts.sort(
                (a, b) => b.rating - a.rating
            );

            break;


        case "name":

            filteredProducts.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

            break;

    }


    return filteredProducts;

}


/* ==================================================
   RENDER PRODUCTS
================================================== */

function renderProducts() {

    const filteredProducts =
        filterProducts();


    productGrid.innerHTML = "";


    /* PRODUCT COUNT */

    productCount.textContent =
        `Showing ${filteredProducts.length} of ${products.length} products`;


    /* EMPTY STATE */

    if (filteredProducts.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    /* CREATE PRODUCT CARDS */

    filteredProducts.forEach(product => {

        const card =
            createProductCard(product);

        productGrid.appendChild(card);

    });

}


/* ==================================================
   CREATE PRODUCT CARD
================================================== */

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className = "product-card";


    card.innerHTML = `

        <div class="product-image">
            ${product.icon}
        </div>

        <div class="product-content">

            <p class="product-category">
                ${product.category}
            </p>

            <h3 class="product-name">
                ${product.name}
            </h3>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="product-meta">

                <span class="product-price">
                    ${formatPrice(product.price)}
                </span>

                <span class="product-rating">
                    ⭐ ${product.rating}
                </span>

            </div>

        </div>

    `;


    return card;

}


/* ==================================================
   SEARCH EVENT
================================================== */

searchInput.addEventListener(
    "input",
    () => {

        filters.search =
            searchInput.value.trim();

        renderProducts();

    }
);


/* ==================================================
   CATEGORY EVENT
================================================== */

categoryFilter.addEventListener(
    "change",
    () => {

        filters.category =
            categoryFilter.value;

        renderProducts();

    }
);


/* ==================================================
   PRICE EVENT
================================================== */

priceFilter.addEventListener(
    "input",
    () => {

        filters.maxPrice =
            Number(priceFilter.value);

        priceValue.textContent =
            priceFilter.value;

        renderProducts();

    }
);


/* ==================================================
   RATING EVENT
================================================== */

ratingFilter.addEventListener(
    "change",
    () => {

        filters.minRating =
            Number(ratingFilter.value);

        renderProducts();

    }
);


/* ==================================================
   SORT EVENT
================================================== */

sortFilter.addEventListener(
    "change",
    () => {

        filters.sort =
            sortFilter.value;

        renderProducts();

    }
);


/* ==================================================
   RESET FILTERS
================================================== */

function resetAllFilters() {

    filters = {

        search: "",

        category: "all",

        maxPrice: 10000,

        minRating: 0,

        sort: "default"

    };


    searchInput.value = "";

    categoryFilter.value = "all";

    priceFilter.value = 10000;

    priceValue.textContent = "10000";

    ratingFilter.value = "0";

    sortFilter.value = "default";


    renderProducts();

}


/* ==================================================
   RESET BUTTONS
================================================== */

resetFilters.addEventListener(
    "click",
    resetAllFilters
);

emptyReset.addEventListener(
    "click",
    resetAllFilters
);


/* ==================================================
   INITIAL RENDER
================================================== */

renderProducts();