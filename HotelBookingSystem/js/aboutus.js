const items = document.querySelectorAll('.item');
const sidebar = document.querySelector('.sidebar');
const totalElement = document.getElementById('total');
let total = 0;
let cartItems = [];

items.forEach((item) => {
  item.querySelector('button').addEventListener('click', () => {
    const price = parseInt(item.querySelector('.fav-price').textContent.replace('₹', ''));
    total += price;
    totalElement.textContent = ₹${total}.00;
    cartItems.push(item.querySelector('h3').textContent);
    updateSidebar();
  });
});

function updateSidebar() {
  const cardItemsElement = sidebar.querySelector('.carditem');
  cardItemsElement.textContent = '';
  cartItems.forEach((item) => {
    const listItem = document.createElement('div');
    listItem.textContent = item;
    cardItemsElement.appendChild(listItem);
  });
}