// Sample menu items array with prices in rupees and descriptions
const menuItems = [
    { id: 1, name: 'DHAM', price: 700, imagePath: "images/dham.jpg", description: 'A traditional feast from Himachal Pradesh' },
    { id: 2, name: 'DHOKLA', price: 600, imagePath: "images/dhokla.jpg", description: 'A savory steamed cake made from fermented rice and chickpea batter' },
    { id: 3, name: 'FISH CURRY', price: 900, imagePath: "images/fishcurry.jpg", description: 'A spicy and tangy curry with tender fish pieces' },
    { id: 4, name: 'MISAL PAV', price: 650, imagePath: "images/misalpav.jpg", description: 'A spicy curry made of sprouted moth beans served with pav bread' },
    { id: 5, name: 'MAKKI DI ROTI SARSO DA SAAG', price: 800, imagePath: "images/punjabi.jpg", description: 'Cornmeal flatbread served with mustard greens' },
    { id: 6, name: 'KOSHA MANGOSHA', price: 750, imagePath: "images/koshamangosha.jpg", description: 'A rich and spicy mutton curry from Bengal' },
    { id: 7, name: 'ROGHAN JOSH', price: 850, imagePath:"images/roghanjosh.jpg" , description: 'A flavorful and aromatic lamb curry from Kashmir' },
    { id: 8, name: 'PONGAL', price: 700, imagePath: "images/pongal.jpg", description: 'A popular South Indian rice and lentil dish seasoned with spices' },
    { id: 9, name: 'PAPAYA KHAR', price: 700, imagePath: "images/papayakhar.jpg", description: 'An Assamese dish made with raw papaya, pulses, and traditional alkaline water' },
];

// Define a fixed delivery charge
const deliveryCharge = 50;

// Function to display menu items
function displayMenu() {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = ''; // Clear previous menu items

    menuItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuContainer.appendChild(menuItem);
    });
}

// Function to create a menu item element
function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    menuItem.innerHTML = `
        <h3>${item.name}</h3>
        <img src="${item.imagePath}" alt="${item.name}">
        <p class="price">₹${item.price.toFixed(2)}</p> <!-- Display price in rupees -->
        <p class="description">${item.description}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    return menuItem;
}

// Function to add item to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        const cartItems = document.getElementById('cart-items');
        const existingCartItem = cartItems.querySelector(`[data-item-id="${itemId}"]`);

        if (existingCartItem) {
            // Item already in cart, increase quantity
            const quantityElement = existingCartItem.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
        } else {
            // Item not in cart, add new item
            const cartItem = document.createElement('li');
            cartItem.setAttribute('data-item-id', itemId);
            cartItem.innerHTML = `
                <span>${item.name} - ₹${item.price.toFixed(2)} <span class="quantity">1</span></span>
                <button class="remove-item" onclick="removeFromCart(${itemId})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        }

        updateTotal(item.price);
    }
}

// Function to remove item from cart
function removeFromCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        const cartItems = document.getElementById('cart-items');
        const cartItem = cartItems.querySelector(`[data-item-id="${itemId}"]`);

        if (cartItem) {
            const quantityElement = cartItem.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);

            if (quantity === 1) {
                // Remove item from cart if quantity is 1
                cartItems.removeChild(cartItem);
            } else {
                // Decrease quantity
                quantity--;
                quantityElement.textContent = quantity;
            }

            // Update total price
            updateTotal(-item.price);
        }
    }
}

// Function to update total price
function updateTotal(price) {
    const totalElement = document.getElementById('total');
    let currentTotal = parseFloat(totalElement.textContent);
    currentTotal += price;
    totalElement.textContent = currentTotal.toFixed(2);
}

// Function to open the checkout modal
function openCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'block';
}

// Function to close the checkout modal
function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Function to handle the checkout form submission
function handleCheckout(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const total = document.getElementById('total').textContent;
    const totalWithDelivery = (parseFloat(total) + deliveryCharge).toFixed(2);

    alert(`Order placed successfully!\n\nName: ${name}\nAddress: ${address}\nContact Number: ${contact}\nTotal Amount: ₹${totalWithDelivery} (including ₹${deliveryCharge.toFixed(2)} delivery charge)`);

    closeCheckoutModal();
}

// Attach event listener to checkout form
document.getElementById('checkout-form').addEventListener('submit', handleCheckout);

// Display menu when the page loads
document.addEventListener('DOMContentLoaded', displayMenu);
