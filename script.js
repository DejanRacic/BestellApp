// Gerichte und Kategorien
const meals = [
  { id: 1, category: "burger", name: "Veggie mushroom black burger", description: "Mixed green salad, Tomatoes, Edamame, Mushrooms", price: 16.90, image: "assets/img/burger-veggie.webp" },
  { id: 2, category: "burger", name: "All meat burger", description: "Beef, Bacon, Dill pickles, Smoked cheese, Ketchup, BBQ sauce", price: 15.90, image: "assets/img/burger-meat.webp" },
  { id: 3, category: "burger", name: "Beef red burger", description: "Beef, Cheese, Tomatoes, Lettuce, Onion", price: 14.90, image: "assets/img/burger-red.webp" },
  { id: 4, category: "burger", name: "Big chicken burger", description: "Chicken, Cheese, Tomatoes, Lettuce, Onion, Bell pepper", price: 15.90, image: "assets/img/burger-chicken.webp" },
  { id: 5, category: "pizza", name: "Pizza Margherita", description: "Tomato sauce, Mozzarella", price: 11.90, image: "assets/img/pizza-margherita.webp" },
  { id: 6, category: "pizza", name: "Pizza Chorizo", description: "Tomato slices, Mozzarella, Chorizo", price: 13.90, image: "assets/img/pizza-chorizo.webp" },
  { id: 7, category: "pizza", name: "Pizza Funghi", description: "Red onion, Olives, Button Mushrooms, Mozzarella", price: 12.90, image: "assets/img/pizza-funghi.webp" },
  { id: 8, category: "pizza", name: "Quattro Formaggi with Chicken", description: "Chicken, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano", price: 15.90, image: "assets/img/pizza-formaggi.webp" },
  { id: 9, category: "salad", name: "Warm beef arugula salad", description: "Beef, Arugula, Field salad, Greek feta, Cherry tomatoes, Balsamic dressing", price: 16.90, image: "assets/img/salad-beef.webp" },
  { id: 10, category: "salad", name: "Mini green Salad", description: "Green salad, Cucumber, Carrots, Parsley, Radishes", price: 7.90, image: "assets/img/salad-mini.webp" },
  { id: 11, category: "salad", name: "Green Salad with sea food", description: "Mixed greens, Mussels, Squid rings, Shrimp, Dijon mustard-lemon dressing", price: 16.90, image: "assets/img/salad-seafood.webp" },
  { id: 12, category: "salad", name: "Vegan green salad with tofu", description: "Green salad, Baby spinach, Edamame, Radishes, Tofu, Peanuts", price: 14.90, image: "assets/img/salad-tofu.webp" }
];

const categories = [
  { id: "burger", title: "Burger & Sandwiches", image: "assets/img/burger-meat.webp" },
  { id: "pizza", title: "Pizza (30cm)", image: "assets/img/pizza-margherita.webp" },
  { id: "salad", title: "Salad", image: "assets/img/salad-mini.webp" }
];

const deliveryFee = 4.99;
const cart = {};

// Hilfsfunktionen und HTML-Templates
function formatPrice(value) {
  return `${value.toFixed(2).replace(".", ",")} €`;
}

function mealCardTemplate(meal) {
  return `<article class="meal-card"><img class="meal-card__image" src="${meal.image}" alt="${meal.name}"><div class="meal-card__body"><h3>${meal.name}</h3><p>${meal.description}</p></div><div class="meal-card__actions"><span class="meal-card__price">${formatPrice(meal.price)}</span><button class="add-button" data-add="${meal.id}" type="button">Add to basket</button></div></article>`;
}

function categoryTemplate(category) {
  const cards = meals.filter(meal => meal.category === category.id).map(mealCardTemplate).join("");
  return `<section class="category" id="${category.id}"><div class="category__banner" style="background-image:url('${category.image}')"><h2>${category.title}</h2></div><div class="meal-list">${cards}</div></section>`;
}

function renderMenu() {
  document.getElementById("menu").innerHTML = categories.map(categoryTemplate).join("");
  document.getElementById("categoryNav").innerHTML = categories.map(categoryLinkTemplate).join("");
}

function categoryLinkTemplate(category) {
  return `<a class="category-link" href="#${category.id}">${category.title}</a>`;
}

// Warenkorb berechnen und darstellen
function cartItemTemplate(meal) {
  return `<article class="basket-item"><button class="delete-button" data-delete="${meal.id}" type="button" aria-label="${meal.name} löschen">×</button><span class="basket-item__name">${cart[meal.id]} x ${meal.name}</span><div class="basket-item__row"><div class="quantity"><button data-minus="${meal.id}" type="button">−</button><strong>${cart[meal.id]}</strong><button data-plus="${meal.id}" type="button">+</button></div><strong>${formatPrice(meal.price * cart[meal.id])}</strong></div></article>`;
}

function getCartMeals() {
  return meals.filter(meal => cart[meal.id]);
}

function getSubtotal() {
  return getCartMeals().reduce((sum, meal) => sum + meal.price * cart[meal.id], 0);
}

function basketSummaryTemplate(subtotal) {
  const total = subtotal + deliveryFee;
  return `<div class="basket__summary"><div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div><div class="summary-row"><span>Delivery fee</span><span>${formatPrice(deliveryFee)}</span></div><div class="summary-row summary-row--total"><span>Total</span><span>${formatPrice(total)}</span></div><button class="order-button" data-order type="button">Buy now (${formatPrice(total)})</button></div>`;
}

function basketTemplate() {
  const selectedMeals = getCartMeals();
  const empty = `<div class="basket__empty"><span>🛒</span><strong>Nothing here yet.</strong><p>Go ahead and choose something delicious!</p></div>`;
  const content = selectedMeals.length ? `<div class="basket__items">${selectedMeals.map(cartItemTemplate).join("")}</div>${basketSummaryTemplate(getSubtotal())}` : empty;
  return `<div class="basket"><h2 class="basket__title">Your Basket</h2>${content}</div>`;
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
