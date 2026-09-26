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
