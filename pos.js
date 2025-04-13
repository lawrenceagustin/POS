document.addEventListener('DOMContentLoaded', function() {
  let cart = [];
  
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const paymentInput = document.getElementById('payment');
  const checkoutButton = document.getElementById('checkout');

  const addToCartButtons = document.querySelectorAll('[id="add-to-cart"], [id="add"][data-name]');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const name = this.getAttribute('data-name');
          const price = parseFloat(this.getAttribute('data-price'));
          
          const existingItem = cart.find(item => item.name === name);
          
          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              cart.push({
                  name: name,
                  price: price,
                  quantity: 1
              });
          }
          
          updateCartDisplay();
      });
  });
  
  function updateCartDisplay() {
      cartItemsContainer.innerHTML = '';
      
      cart.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.className = 'flex justify-between items-center mb-2 p-2 bg-gray-200 rounded';
          
          itemElement.innerHTML = `
              <div class="flex-1">
                  <span class="font-medium">${item.name}</span>
                  <span class="text-sm">(₱${item.price.toFixed(2)})</span>
              </div>
              <div class="flex items-center">
                  <button class="decrease-quantity bg-gray-300 px-2 rounded" data-name="${item.name}">-</button>
                  <span class="mx-2">${item.quantity}</span>
                  <button class="increase-quantity bg-gray-300 px-2 rounded" data-name="${item.name}">+</button>
                  <button class="remove-item bg-red-300 px-2 rounded ml-2" data-name="${item.name}">×</button>
              </div>
          `;
          
          cartItemsContainer.appendChild(itemElement);
      });
      
      document.querySelectorAll('.decrease-quantity').forEach(button => {
          button.addEventListener('click', function() {
              const name = this.getAttribute('data-name');
              const item = cart.find(item => item.name === name);
              
              if (item.quantity > 1) {
                  item.quantity -= 1;
              } else {
                  cart = cart.filter(item => item.name !== name);
              }
              
              updateCartDisplay();
          });
      });
      
      document.querySelectorAll('.increase-quantity').forEach(button => {
          button.addEventListener('click', function() {
              const name = this.getAttribute('data-name');
              const item = cart.find(item => item.name === name);
              item.quantity += 1;
              updateCartDisplay();
          });
      });
      
      document.querySelectorAll('.remove-item').forEach(button => {
          button.addEventListener('click', function() {
              const name = this.getAttribute('data-name');
              cart = cart.filter(item => item.name !== name);
              updateCartDisplay();
          });
      });
      
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      totalElement.textContent = `₱${total.toFixed(2)}`;
  }
  
  checkoutButton.addEventListener('click', function() {
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const payment = parseFloat(paymentInput.value) || 0;
      
      if (cart.length === 0) {
          alert('Your cart is empty!');
          return;
      }
      
      if (payment < total) {
          alert(`Insufficient payment. Total is ₱${total.toFixed(2)}`);
          return;
      }
      
      const change = payment - total;
      alert(`Order successful!\nTotal: ₱${total.toFixed(2)}\nPayment: ₱${payment.toFixed(2)}\nChange: ₱${change.toFixed(2)}`);
      
      // Clear the cart
      cart = [];
      paymentInput.value = '';
      updateCartDisplay();
  });

  //burger navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});