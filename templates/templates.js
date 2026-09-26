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

function mealCardTemplate(meal) {
  return `<article class="meal-card"><img class="meal-card__image" src="${meal.image}" alt="${meal.name}"><div class="meal-card__body"><h3>${meal.name}</h3><p>${meal.description}</p></div><div class="meal-card__actions"><span class="meal-card__price">${formatPrice(meal.price)}</span><button class="add-button" data-add="${meal.id}" type="button">Add to basket</button></div></article>`;
}

function categoryTemplate(category) {
  const cards = meals.filter(meal => meal.category === category.id).map(mealCardTemplate).join("");
  return `<section class="category" id="${category.id}"><div class="category__banner" style="background-image:url('${category.image}')"><h2>${category.title}</h2></div><div class="meal-list">${cards}</div></section>`;
}

function categoryLinkTemplate(category) {
  return `<a class="category-link" href="#${category.id}">${category.title}</a>`;
}

function cartItemTemplate(meal) {
  return `<article class="basket-item"><button class="delete-button" data-delete="${meal.id}" type="button" aria-label="${meal.name} löschen">×</button><span class="basket-item__name">${cart[meal.id]} x ${meal.name}</span><div class="basket-item__row"><div class="quantity"><button data-minus="${meal.id}" type="button">−</button><strong>${cart[meal.id]}</strong><button data-plus="${meal.id}" type="button">+</button></div><strong>${formatPrice(meal.price * cart[meal.id])}</strong></div></article>`;
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
