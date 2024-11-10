function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}
function addToCart(product) {
    // Get the current cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.productName === product.productName);
    if (existingItem) {
        // Increase quantity if it already exists
        existingItem.quantity += 1; // Increment the quantity
    } else {
        // Add new item with quantity 1 if it's a new product
        cart.push({
            ...product,
            quantity: 1
        }); // New product starts with quantity 1
    }
    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update the cart count display
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.length; // Get the number of unique items
    document.getElementById('cartCount').textContent = totalItems > 0 ? totalItems : '';
}
// Call updateCartCount initially to set the correct count on page load
updateCartCount();
// Initialize AOS
AOS.init();
function applyDiscount() {
    const originalPrice = 229.99;
    const discountRate = 0.30;
    const discountedPrice = originalPrice * (1 - discountRate);
    // Display the prices
    document.getElementById('oldPrice').textContent = `$${originalPrice.toFixed(2)}`;
    document.getElementById('discountedPrice').textContent = `$${discountedPrice.toFixed(2)}`;
}
// Call the function to apply the discount when the page loads
applyDiscount();
  // JavaScript function to change the main image
  function changeImage(imageUrl) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
    // Highlight the active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail) => {
        thumbnail.classList.remove('active');
        if (thumbnail.src.includes(imageUrl)) {
            thumbnail.classList.add('active');
        }
    });
}
function addToCart() {
    const color = document.getElementById('color').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.querySelector('.price').textContent;
    const cartItem = {
        productName: productName,
        color: color,
        quantity: quantity,
        price: price
    };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${quantity} ${color} ${productName}`);
    window.location.href = "cart.html"; // Redirect to cart page
}

//JavaScript for Navigation//

    let currentIndex2 = 0;
    const cards = document.querySelectorAll('.flip-card');

    function showTestimonial(index) {
        cards.forEach((card, i) => {
            card.style.display = (i === index) ? 'flex' : 'none';
        });
    }

    function nextTestimonial() {
        currentIndex2 = (currentIndex2 + 1) % cards.length;
        showTestimonial(currentIndex2);
    }

    function prevTestimonial() {
        currentIndex2 = (currentIndex2 - 1 + cards.length) % cards.length;
        showTestimonial(currentIndex2);
    }
    // Initial display
    showTestimonial(currentIndex2);
    function togglePaymentFields(method, element) {
        // Hide all fields first
        document.querySelectorAll('.payment-fields').forEach(div => div.style.display = 'none');
        // Reset all dots to grey
        document.querySelectorAll('.dot').forEach(dot => dot.style.backgroundColor = 'lightgrey');
        // Show the selected method's fields and turn the dot green
        document.getElementById(method + 'Fields').style.display = 'block';
        element.querySelector('.dot').style.backgroundColor = 'green';
    }

    function redirectToPayPal() {
        window.location.href = 'https://www.paypal.com';
    }

    function processPayment() {
        const selectedMethod = document.querySelector('.payment-fields[style*="display: block"]');
        if (!selectedMethod) {
            alert('Please select a payment method.');
            return;
        }
        alert(`Processing payment via ${selectedMethod.id.replace('Fields', '')}`);
    }

    let couponDiscount = 0; // Initialize coupon discount
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsDiv = document.getElementById('cartItems');
        cartItemsDiv.innerHTML = '';
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }
        let subtotal = 0; // Initialize subtotal
        cart.forEach(item => {
            const itemTotal = item.quantity * parseFloat(item.price.replace('$', ''));
            subtotal += itemTotal;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.productName}" style="width: 150px; height: 100px;">
        <h3>${item.productName}</h3>
        <p>Color: ${item.color}</p>
        <p>Price: ${item.price}</p>
        <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.productName}', this.value)">
        <p>Total: <span class="itemTotal">$${itemTotal.toFixed(2)}</span></p>
    `;
            cartItemsDiv.appendChild(itemDiv);
        });
        const salesTax = 20;
        const shipping = calculateShipping(subtotal);
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('salesTax').textContent = `$${salesTax.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('grandTotal').textContent = `$${calculateGrandTotal(subtotal, salesTax, shipping).toFixed(2)}`;
        document.getElementById('shippingMessage').style.display = subtotal >= 200 ? 'block' : 'none';
    }

    function calculateShipping(subtotal) {
        return subtotal > 200 ? 0 : 10; // Example: Free shipping if subtotal is over $200, otherwise $10
    }

    function updateQuantity(productName, quantity) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(item => {
            if (item.productName === productName) {
                item.quantity = parseInt(quantity);
            }
            return item;
        });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCart();
    }

    function applyCoupon() {
        const couponInput = document.getElementById('coupon').value;
        if (couponInput === "SAVE20") {
            couponDiscount = 20;
            document.getElementById('couponMessage').style.display = "none";
        } else {
            showInvalidCouponMessage();
        }
        const subtotal = parseFloat(document.getElementById('subtotal').textContent.replace('$', ''));
        const salesTax = parseFloat(document.getElementById('salesTax').textContent.replace('$', ''));
        const shipping = parseFloat(document.getElementById('shipping').textContent.replace('$', ''));
        document.getElementById('grandTotal').textContent = `$${calculateGrandTotal(subtotal, salesTax, shipping).toFixed(2)}`;
    }

    function showInvalidCouponMessage() {
        const messageElement = document.getElementById('couponMessage');
        messageElement.textContent = "Coupon code is invalid";
        messageElement.style.display = "block";
        setTimeout(() => {
            messageElement.style.display = "none";
        }, 5000);
    }

    function calculateGrandTotal(subtotal, salesTax, shipping) {
        const total = subtotal + salesTax + shipping - couponDiscount;
        return total < 0 ? 0 : total;
    }

    function checkout() {
        document.getElementById('checkoutForm').style.display = 'block';
    }

    function completePurchase() {
        alert("Thank you for your purchase!");
        clearCart(); // Clear the cart after purchase
        document.getElementById('trackingNumber').textContent = 'TRK-' + Math.floor(Math.random() * 1000000);
    }

    function clearCart() {
        localStorage.removeItem('cart');
        displayCart();
        document.getElementById('trackingNumber').textContent = 'Not yet assigned';
        alert("Your cart has been cleared.");
    }
    // Initial call to display the cart
    displayCart();

// Cart Icon to open sidebar//

// Toggle the visibility of the cart sidebar
function toggleCartSidebar() {
    const cartSidebar = document.getElementById("cartSidebar");
    cartSidebar.classList.toggle("active");
}
 // Show the WhatsApp button when scrolling down
 window.onscroll = function() {
    const whatsappBtn = document.getElementById("whatsappButton");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        whatsappBtn.style.display = "block";
    } else {
        whatsappBtn.style.display = "none";
    }
};
// Show the button when scrolling down
window.onscroll = function() {
    const scrollBtn = document.getElementById("scrollToTopBtn2");
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}
// Show the button when scrolling down
window.onscroll = function() {
    const scrollBtn = document.getElementById("scrollToTopBtn2");
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}