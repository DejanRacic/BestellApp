const deliveryFee = 4.99;
const cart = {};

// Hilfsfunktionen
function formatPrice(value) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function renderMenu() {
  document.getElementById("menu").innerHTML = categories.map(categoryTemplate).join("");
  document.getElementById("categoryNav").innerHTML = categories.map(categoryLinkTemplate).join("");
}

// Warenkorb berechnen und darstellen
function getCartMeals() {
  return meals.filter(meal => cart[meal.id]);
}

function getSubtotal() {
  return getCartMeals().reduce((sum, meal) => sum + meal.price * cart[meal.id], 0);
}

function renderBaskets() {
  document.getElementById("desktopBasket").innerHTML = basketTemplate();
  document.getElementById("mobileBasket").innerHTML = basketTemplate();
  updateMobileBasketButton();
  updateAddButtons();
}

function updateMobileBasketButton() {
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = count ? getSubtotal() + deliveryFee : 0;
  document.getElementById("mobileBasketTotal").textContent = `${count} · ${formatPrice(total)}`;
}

function updateAddButtons() {
  document.querySelectorAll("[data-add]").forEach(updateAddButton);
}

function updateAddButton(button) {
  const quantity = cart[button.dataset.add] || 0;
  button.textContent = quantity ? `Added ${quantity}` : "Add to basket";
  button.classList.toggle("added", Boolean(quantity));
}

// Änderungen am Warenkorb
function addMeal(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderBaskets();
}

function reduceMeal(id) {
  cart[id] > 1 ? cart[id]-- : delete cart[id];
  renderBaskets();
}

function removeMeal(id) {
  delete cart[id];
  renderBaskets();
}

function placeOrder() {
  if (!getCartMeals().length) return;
  Object.keys(cart).forEach(id => delete cart[id]);
  closeBasketDialog();
  renderBaskets();
  showOrderMessage();
}

function closeBasketDialog() {
  const dialog = document.getElementById("basketDialog");
  if (dialog.open) dialog.close();
}

// Bestellbestätigung
function showOrderMessage() {
  const message = document.getElementById("orderMessage");
  message.classList.add("show");
  clearTimeout(showOrderMessage.timer);
  showOrderMessage.timer = setTimeout(hideOrderMessage, 4500);
}

function hideOrderMessage() {
  document.getElementById("orderMessage").classList.remove("show");
}

// Events und Start der App
function handleAction(event) {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.add) addMeal(button.dataset.add);
  if (button.dataset.plus) addMeal(button.dataset.plus);
  if (button.dataset.minus) reduceMeal(button.dataset.minus);
  if (button.dataset.delete) removeMeal(button.dataset.delete);
  if (button.hasAttribute("data-order")) placeOrder();
}

function connectStaticButtons() {
  const dialog = document.getElementById("basketDialog");
  document.getElementById("mobileBasketButton").onclick = () => dialog.showModal();
  document.getElementById("closeBasketButton").onclick = () => dialog.close();
  document.getElementById("closeMessageButton").onclick = hideOrderMessage;
}

function init() {
  renderMenu();
  renderBaskets();
  connectStaticButtons();
  document.addEventListener("click", handleAction);
}

init();
