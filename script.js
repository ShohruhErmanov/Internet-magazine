const catalogItems = {
  Акции: ["Скидки недели", "Специальные предложения", "Новинки"],
  Популярное: ["Хиты продаж", "Часто покупают", "Рекомендуем"],
  Супермаркет: ["Вода и напитки", "Молоко, масло и яйца", "Снэки и сухофрукты", "Кофе, чай и сладости", "Макароны и крупы", "Хлеб и выпечка"],
  Кулинария: ["Готовые блюда", "Салаты", "Сырники и десерты"],
  Заморозка: ["Овощи и ягоды", "Полуфабрикаты", "Мороженое"],
  Другое: ["Товары для дома", "Для детей", "Для животных"],
  "Продукция «Ильинского»": ["Молочная продукция", "Мясо и птица", "Фермерские продукты"],
};

const additionalProducts = [
  { id: "apples", name: "Яблоки сезонные", title: "Яблоки сезонные, 1 кг", category: "Овощи и фрукты", price: 159, oldPrice: 189, image: "photo-1560806887-1e4cd0b6cbd6", alt: "Свежие красные яблоки" },
  { id: "cheese", name: "Сыр фермерский", title: "Сыр фермерский полутвёрдый, 200 г", category: "Молочные продукты", price: 389, oldPrice: 449, image: "photo-1486297678162-eb2a19b0a32d", alt: "Ассорти фермерских сыров" },
  { id: "chicken", name: "Филе куриное", title: "Филе куриное охлаждённое, 700 г", category: "Мясо и птица", price: 429, oldPrice: 499, image: "photo-1604503468506-a8da13d82791", alt: "Свежее куриное филе" },
  { id: "juice", name: "Сок апельсиновый", title: "Сок апельсиновый прямого отжима, 1 л", category: "Напитки", price: 199, oldPrice: 239, image: "photo-1600271886742-f049cd451bba", alt: "Стакан апельсинового сока" },
  { id: "yogurt", name: "Йогурт натуральный", title: "Йогурт натуральный фермерский, 300 г", category: "Молочные продукты", price: 99, oldPrice: 119, image: "photo-1488477181946-6428a0291777", alt: "Йогурт с ягодами" },
  { id: "honey", name: "Мёд цветочный", title: "Мёд цветочный натуральный, 250 г", category: "Бакалея", price: 349, oldPrice: 399, image: "photo-1587049352851-8d4e89133924", alt: "Натуральный цветочный мёд" },
  { id: "tomatoes", name: "Томаты черри", title: "Томаты черри сладкие, 300 г", category: "Овощи и фрукты", price: 179, oldPrice: 219, image: "photo-1546094096-0df4bcaaa337", alt: "Свежие красные томаты черри" },
  { id: "butter", name: "Масло сливочное", title: "Масло сливочное 82,5%, 180 г", category: "Молочные продукты", price: 229, oldPrice: 269, image: "photo-1589985270826-4b7bb135bc9d", alt: "Сливочное масло" },
  { id: "avocado", name: "Авокадо спелое", title: "Авокадо спелое, 1 шт.", category: "Овощи и фрукты", price: 149, oldPrice: 179, image: "photo-1523049673857-eb18f1d7b578", alt: "Спелый авокадо" },
  { id: "bananas", name: "Бананы", title: "Бананы спелые, 1 кг", category: "Овощи и фрукты", price: 139, oldPrice: 159, image: "photo-1571771894821-ce9b6c11b08e", alt: "Свежие бананы" },
  { id: "oranges", name: "Апельсины", title: "Апельсины сочные, 1 кг", category: "Овощи и фрукты", price: 189, oldPrice: 229, image: "photo-1547514701-42782101795e", alt: "Спелые апельсины" },
  { id: "cucumbers", name: "Огурцы свежие", title: "Огурцы свежие, 500 г", category: "Овощи и фрукты", price: 129, oldPrice: 159, image: "photo-1604977042946-1eecc30f269e", alt: "Свежие зелёные огурцы" },
  { id: "eggs", name: "Яйца куриные", title: "Яйца куриные фермерские, 10 шт.", category: "Молочные продукты", price: 169, oldPrice: 199, image: "photo-1506976785307-8732e854ad03", alt: "Свежие куриные яйца" },
  { id: "croissant", name: "Круассан с маслом", title: "Круассан французский, 2 шт.", category: "Хлеб и выпечка", price: 119, oldPrice: 149, image: "photo-1555507036-ab1f4038808a", alt: "Свежие французские круассаны" },
  { id: "salmon", name: "Филе лосося", title: "Филе лосося охлаждённое, 300 г", category: "Рыба", price: 649, oldPrice: 729, image: "photo-1519708227418-c8fd9a32b7a2", alt: "Филе свежего лосося" },
  { id: "coffee", name: "Кофе в зёрнах", title: "Кофе арабика в зёрнах, 250 г", category: "Бакалея", price: 499, oldPrice: 579, image: "photo-1445116572660-236099ec97a0", alt: "Свежесваренный кофе" },
  { id: "pasta", name: "Макароны итальянские", title: "Паста из твёрдых сортов, 400 г", category: "Бакалея", price: 139, oldPrice: 169, image: "photo-1555949258-eb67b1ef0ceb", alt: "Итальянская паста" },
  { id: "ice-cream", name: "Мороженое сливочное", title: "Мороженое пломбир, 300 г", category: "Заморозка", price: 199, oldPrice: 239, image: "photo-1560008581-09826d1de69e", alt: "Сливочное мороженое" },
  { id: "mushrooms", name: "Шампиньоны", title: "Шампиньоны свежие, 400 г", category: "Овощи и фрукты", price: 199, oldPrice: 239, image: "photo-1504545102780-26774c1bb073", alt: "Свежие шампиньоны" },
  { id: "raspberries", name: "Малина свежая", title: "Малина свежая, 125 г", category: "Овощи и фрукты", price: 229, oldPrice: 269, image: "photo-1577069861033-55d04cec4ef5", alt: "Свежая красная малина" },
  { id: "blueberries", name: "Голубика", title: "Голубика свежая, 125 г", category: "Овощи и фрукты", price: 259, oldPrice: 299, image: "photo-1498557850523-fd3d118b962e", alt: "Спелая свежая голубика" },
  { id: "pears", name: "Груши конференция", title: "Груши конференция, 1 кг", category: "Овощи и фрукты", price: 219, oldPrice: 259, image: "photo-1519996529931-28324d8a630e", alt: "Свежие спелые груши" },
  { id: "carrots", name: "Морковь молодая", title: "Морковь молодая, 500 г", category: "Овощи и фрукты", price: 89, oldPrice: 109, image: "photo-1445282768818-728615cc910a", alt: "Свежая морковь" },
  { id: "broccoli", name: "Брокколи свежая", title: "Брокколи свежая, 400 г", category: "Овощи и фрукты", price: 159, oldPrice: 189, image: "photo-1459411621453-7b03977f4bfc", alt: "Свежая зелёная брокколи" },
  { id: "grapes", name: "Виноград красный", title: "Виноград красный без косточек, 500 г", category: "Овощи и фрукты", price: 299, oldPrice: 349, image: "photo-1537640538966-79f369143f8f", alt: "Свежий красный виноград" },
  { id: "watermelon", name: "Арбуз сладкий", title: "Арбуз сладкий, 1 кг", category: "Овощи и фрукты", price: 79, oldPrice: 99, image: "photo-1571575173700-afb9492e6a50", alt: "Спелый сочный арбуз" },
  { id: "lemons", name: "Лимоны", title: "Лимоны сочные, 500 г", category: "Овощи и фрукты", price: 119, oldPrice: 149, image: "photo-1513558161293-cdaf765edfd7", alt: "Свежие лимоны" },
  { id: "shrimp", name: "Креветки тигровые", title: "Креветки тигровые очищенные, 300 г", category: "Рыба", price: 579, oldPrice: 649, image: "photo-1565680018434-b513d5e5fd47", alt: "Тигровые креветки" },
  { id: "dumplings", name: "Пельмени домашние", title: "Пельмени домашние, 500 г", category: "Заморозка", price: 399, oldPrice: 459, image: "photo-1563245372-f21724e3856d", alt: "Домашние пельмени" },
  { id: "peaches", name: "Персики спелые", title: "Персики спелые, 1 кг", category: "Овощи и фрукты", price: 329, oldPrice: 379, image: "photo-1595743825637-cdafc8ad4173", alt: "Спелые сочные персики" },
  { id: "kiwi", name: "Киви зелёный", title: "Киви зелёный, 500 г", category: "Овощи и фрукты", price: 199, oldPrice: 239, image: "photo-1618897996318-5a901fa6ca71", alt: "Свежий зелёный киви" },
  { id: "pomegranate", name: "Гранат спелый", title: "Гранат спелый, 1 шт.", category: "Овощи и фрукты", price: 189, oldPrice: 229, image: "photo-1541344999736-83eca272f6fc", alt: "Спелый красный гранат" },
  { id: "bell-peppers", name: "Перец сладкий", title: "Перец сладкий разноцветный, 500 г", category: "Овощи и фрукты", price: 219, oldPrice: 259, image: "photo-1563565375-f3fdfdbefa83", alt: "Разноцветный сладкий перец" },
  { id: "cauliflower", name: "Овощной микс", title: "Овощной микс сезонный, 400 г", category: "Овощи и фрукты", price: 179, oldPrice: 219, image: "photo-1498837167922-ddd27525d352", alt: "Ассорти свежих сезонных овощей" },
  { id: "garlic", name: "Чеснок молодой", title: "Чеснок молодой, 200 г", category: "Овощи и фрукты", price: 99, oldPrice: 119, image: "photo-1540148426945-6cf22a6b2383", alt: "Свежий чеснок" },
  { id: "cottage-cheese", name: "Творог фермерский", title: "Творог фермерский 9%, 300 г", category: "Молочные продукты", price: 179, oldPrice: 209, image: "photo-1550583724-b2692b85b150", alt: "Свежий фермерский творог" },
  { id: "pancakes", name: "Блины домашние", title: "Блины домашние, 300 г", category: "Кулинария", price: 189, oldPrice: 229, image: "photo-1528207776546-365bb710ee93", alt: "Румяные домашние блины" },
  { id: "buns", name: "Булочки с корицей", title: "Булочки с корицей, 2 шт.", category: "Хлеб и выпечка", price: 149, oldPrice: 179, image: "photo-1509365465985-25d11c17e812", alt: "Свежие булочки с корицей" },
  { id: "tea", name: "Чай зелёный листовой", title: "Чай зелёный листовой, 100 г", category: "Бакалея", price: 279, oldPrice: 329, image: "photo-1556679343-c7306c1976bc", alt: "Зелёный листовой чай" },
];

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  Object.assign(card.dataset, {
    id: product.id,
    name: product.name,
    category: product.category,
    price: String(product.price),
    oldPrice: String(product.oldPrice),
  });

  const photo = document.createElement("div");
  photo.className = "product-card__photo";
  const discount = document.createElement("span");
  discount.className = "discount-badge";
  discount.textContent = `−${Math.round((1 - product.price / product.oldPrice) * 100)}%`;
  const favorite = document.createElement("button");
  favorite.className = "favorite-button";
  favorite.type = "button";
  favorite.setAttribute("aria-label", "Добавить в избранное");
  favorite.textContent = "♡";
  const image = document.createElement("img");
  image.src = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=520&q=80`;
  image.alt = product.alt;
  image.loading = "lazy";
  photo.append(discount, favorite, image);

  const info = document.createElement("div");
  info.className = "product-card__info";
  const category = document.createElement("span");
  category.className = "product-card__category";
  category.textContent = product.category;
  const title = document.createElement("h3");
  title.textContent = product.title;
  const price = document.createElement("div");
  price.className = "product-card__price";
  const currentPrice = document.createElement("strong");
  currentPrice.textContent = `${product.price} ₽`;
  const oldPrice = document.createElement("del");
  oldPrice.textContent = `${product.oldPrice} ₽`;
  price.append(currentPrice, oldPrice);
  const addButton = document.createElement("button");
  addButton.className = "add-button";
  addButton.type = "button";
  addButton.append("В корзину ", Object.assign(document.createElement("span"), { textContent: "+" }));
  info.append(category, title, price, addButton);
  card.append(photo, info);
  return card;
}

document.querySelector("#products").append(...additionalProducts.map(createProductCard));

const catalogToggle = document.querySelector(".catalog-toggle");
const catalogMenu = document.querySelector("#catalog-menu");
const catalogTitle = document.querySelector("#catalog-title");
const catalogLinks = document.querySelector("#catalog-links");
const searchInput = document.querySelector("#search-input");
const productCards = [...document.querySelectorAll(".product-card")];
const cartDrawer = document.querySelector(".cart-drawer");
const cartBackdrop = document.querySelector(".drawer-backdrop");
const cartItems = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.querySelector(".cart-total");
const cartEmpty = document.querySelector(".cart-empty");
const cartFooter = document.querySelector(".cart-drawer__footer");
const toast = document.querySelector(".toast");
const cart = new Map();
const heroSlides = [
  {
    eyebrow: "Вкуснее вместе",
    title: ["Радость", "в каждом кусочке"],
    description: "Время порадовать себя чем-то особенным",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=85",
    alt: "Праздничный торт со свежими ягодами",
  },
  {
    eyebrow: "Свежий сезон",
    title: ["Подарки", "лета на столе"],
    description: "Сочные ягоды и фрукты для хорошего настроения",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1100&q=85",
    alt: "Свежая клубника",
  },
  {
    eyebrow: "Фермерский выбор",
    title: ["Свежесть", "рядом с вами"],
    description: "Отборные продукты от наших фермеров",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85",
    alt: "Свежие овощи и зелень",
  },
  {
    eyebrow: "Идеи к завтраку",
    title: ["Начните день", "вкусно"],
    description: "Всё для уютного завтрака уже в каталоге",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1100&q=85",
    alt: "Свежий хлеб к завтраку",
  },
];
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2300);
}

function setCatalogCategory(category) {
  document.querySelectorAll(".catalog-category").forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  catalogTitle.textContent = category;
  catalogLinks.replaceChildren(...catalogItems[category].map((item) => {
    const link = document.createElement("a");
    link.href = `#/catalog?category=${encodeURIComponent(item)}`;
    link.textContent = item;
    link.addEventListener("click", () => {
      catalogMenu.hidden = true;
      catalogToggle.setAttribute("aria-expanded", "false");
    });
    return link;
  }));
}

function filterProducts(category = "all") {
  const query = searchInput.value.trim().toLocaleLowerCase("ru");
  let visibleCount = 0;
  productCards.forEach((card) => {
    const matchesCategory = category === "all" || card.dataset.category === category;
    const matchesSearch = !query || card.dataset.name.toLocaleLowerCase("ru").includes(query)
      || card.dataset.category.toLocaleLowerCase("ru").includes(query);
    const visible = matchesCategory && matchesSearch;
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  document.querySelector(".empty-message").hidden = visibleCount > 0;
  document.querySelectorAll(".deal-chip").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.filter === category);
  });
}

function updateCart() {
  let quantity = 0;
  let total = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
    total += Number(item.card.dataset.price) * item.quantity;
  });
  cartCount.textContent = String(quantity);
  cartCount.classList.toggle("has-items", quantity > 0);
  cartTotal.textContent = `${total.toLocaleString("ru-RU")} ₽`;
  cartEmpty.hidden = quantity > 0;
  cartFooter.hidden = quantity === 0;
  cartItems.replaceChildren(...[...cart.values()].map(({ card, quantity: count }) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    const image = document.createElement("div");
    image.className = "cart-item__image";
    const img = card.querySelector(".product-card__photo img").cloneNode();
    img.alt = "";
    img.removeAttribute("loading");
    image.append(img);
    const details = document.createElement("div");
    details.className = "cart-item__details";
    const name = document.createElement("strong");
    name.textContent = card.dataset.name;
    const price = document.createElement("small");
    price.textContent = `${Number(card.dataset.price).toLocaleString("ru-RU")} ₽`;
    details.append(name, price);
    const controls = document.createElement("div");
    controls.className = "quantity-control";
    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", `Уменьшить количество: ${card.dataset.name}`);
    minus.addEventListener("click", () => changeQuantity(card, -1));
    const amount = document.createElement("span");
    amount.textContent = String(count);
    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", `Увеличить количество: ${card.dataset.name}`);
    plus.addEventListener("click", () => changeQuantity(card, 1));
    controls.append(minus, amount, plus);
    row.append(image, details, controls);
    return row;
  }));
}

function changeQuantity(card, delta) {
  const item = cart.get(card.dataset.name);
  const quantity = (item?.quantity ?? 0) + delta;
  if (quantity <= 0) cart.delete(card.dataset.name);
  else cart.set(card.dataset.name, { card, quantity });
  updateCart();
  if (["cart", "checkout"].includes(currentRoute().path)) renderRoute();
}

function setCartOpen(isOpen) {
  cartDrawer.classList.toggle("is-open", isOpen);
  cartDrawer.setAttribute("aria-hidden", String(!isOpen));
  cartBackdrop.hidden = !isOpen;
  document.body.classList.toggle("cart-is-open", isOpen);
  if (isOpen) cartDrawer.querySelector(".close-button").focus();
}

catalogToggle.addEventListener("click", () => {
  const isOpen = catalogToggle.getAttribute("aria-expanded") !== "true";
  catalogToggle.setAttribute("aria-expanded", String(isOpen));
  catalogMenu.hidden = !isOpen;
});

document.querySelectorAll(".catalog-category").forEach((button) => {
  button.addEventListener("click", () => setCatalogCategory(button.dataset.category));
});
setCatalogCategory("Акции");

document.addEventListener("click", (event) => {
  if (!event.target.closest(".catalog-wrap")) {
    catalogMenu.hidden = true;
    catalogToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelector(".search").addEventListener("submit", (event) => {
  event.preventDefault();
  location.hash = `#/catalog?q=${encodeURIComponent(searchInput.value.trim())}`;
});
searchInput.addEventListener("input", () => {
  filterProducts(document.querySelector(".deal-chip.is-selected")?.dataset.filter || "all");
});

document.querySelectorAll(".deal-chip").forEach((button) => {
  button.addEventListener("click", () => filterProducts(button.dataset.filter));
});
document.querySelectorAll(".quick-nav [data-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    searchInput.value = "";
    filterProducts(link.dataset.filter);
  });
});
document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    changeQuantity(card, 1);
    showToast(`${card.dataset.name} добавлен в корзину`);
  });
});
document.querySelectorAll(".favorite-button").forEach((button) => {
  button.addEventListener("click", () => {
    toggleFavorite(button.closest(".product-card"), button);
  });
});

document.querySelector("[data-open-cart]").addEventListener("click", () => setCartOpen(true));
document.querySelectorAll("[data-close-cart]").forEach((button) => {
  button.addEventListener("click", () => setCartOpen(false));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setCartOpen(false);
});

document.querySelectorAll("[data-dialog]").forEach((button) => {
  button.addEventListener("click", () => document.getElementById(button.dataset.dialog).showModal());
});
const deliveryDialog = document.querySelector("#delivery-dialog");
let deliveryMode = "delivery";
document.querySelectorAll("[data-delivery-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    deliveryMode = button.dataset.deliveryMode;
    document.querySelectorAll("[data-delivery-mode]").forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-pressed", String(isSelected));
    });
    const isDelivery = deliveryMode === "delivery";
    deliveryDialog.classList.toggle("is-pickup", !isDelivery);
    deliveryDialog.querySelector("#address-input").placeholder = isDelivery ? "Введите адрес доставки" : "Введите адрес магазина";
    deliveryDialog.querySelector("#recent-address-title").textContent = isDelivery ? "Последние адреса" : "Ближайшие магазины";
    deliveryDialog.querySelectorAll(".recent-address").forEach((address, index) => {
      const location = isDelivery
        ? ["ул. Ленина, д. 13, Красногорск, городской округ Красногорск", "ул. Новая, д. 13, Красногорск, городской округ Красногорск"][index]
        : ["Ильинский, ул. Большая Тульская, 13", "Ильинский, Ленинградский проспект, 36"][index];
      address.dataset.address = location;
      address.querySelector("span:nth-child(2)").textContent = location;
      address.classList.remove("is-selected");
    });
  });
});
deliveryDialog.querySelectorAll(".recent-address").forEach((button) => {
  button.addEventListener("click", () => {
    deliveryDialog.querySelector("#address-input").value = button.dataset.address;
    deliveryDialog.querySelectorAll(".recent-address").forEach((address) => address.classList.toggle("is-selected", address === button));
  });
});
deliveryDialog.querySelector(".address-clear").addEventListener("click", () => {
  const address = deliveryDialog.querySelector("#address-input");
  address.value = "";
  address.focus();
  deliveryDialog.querySelectorAll(".recent-address").forEach((item) => item.classList.remove("is-selected"));
});
document.querySelectorAll(".dialog-submit").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    if (dialog.id === "delivery-dialog") {
      const address = dialog.querySelector(".address-input").value.trim();
      if (!address) {
        dialog.querySelector(".address-input").focus();
        showToast("Укажите адрес или город");
        return;
      }
      const date = dialog.querySelector("#delivery-date").value;
      const time = dialog.querySelector("#delivery-time").value;
      const method = deliveryMode === "delivery" ? "Доставка" : "Самовывоз";
      document.querySelector(".delivery-button b").textContent = method;
      document.querySelector(".delivery-button small").textContent = `${address} · ${date}, ${time}`;
      showToast("Способ получения сохранён");
    } else {
      const phone = dialog.querySelector(".address-input").value.trim();
      if (!phone) {
        dialog.querySelector(".address-input").focus();
        showToast("Введите номер телефона");
        return;
      }
      showToast("Если номер указан верно, код скоро придёт");
    }
    dialog.close();
  });
});
document.querySelector(".checkout-button:not(.dialog-submit)").addEventListener("click", (event) => {
  event.preventDefault();
  location.hash = "#/checkout";
});
let activeSlide = 0;
function showHeroSlide(index) {
  activeSlide = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[activeSlide];
  document.querySelector(".hero-banner .eyebrow").textContent = slide.eyebrow;
  const heading = document.querySelector(".hero-banner h1");
  heading.setAttribute("aria-label", slide.title.join(" "));
  heading.replaceChildren(...slide.title.map((line) => {
    const span = document.createElement("span");
    span.textContent = line;
    return span;
  }));
  document.querySelector(".hero-banner__copy p").textContent = slide.description;
  const image = document.querySelector(".hero-banner__image");
  image.src = slide.image;
  image.alt = slide.alt;
  document.querySelectorAll(".hero-banner__dots button").forEach((button, buttonIndex) => {
    const isActive = buttonIndex === activeSlide;
    button.classList.toggle("is-active", isActive);
    if (isActive) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
}
document.querySelectorAll(".hero-banner__dots button").forEach((button) => {
  button.addEventListener("click", () => showHeroSlide(Number(button.dataset.slide)));
});
document.querySelector(".hero-banner__next").addEventListener("click", () => showHeroSlide(activeSlide + 1));

const homeView = document.querySelector("#home-view");
const pageView = document.querySelector("#page-view");
const favoriteIds = new Set();
const routeTitles = {
  home: "Ильинский онлайн — интернет-магазин продуктов",
  catalog: "Каталог продуктов",
  product: "Карточка товара",
  promotions: "Акции и скидки",
  stores: "Магазины",
  vacancies: "Вакансии",
  contacts: "Контакты",
  account: "Личный кабинет",
  favorites: "Избранное",
  cart: "Корзина",
  checkout: "Оформление заказа",
  order: "Заказ оформлен",
  "404": "Страница не найдена",
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character]);
}

function currentRoute() {
  if (!location.hash.startsWith("#/")) return { path: "home", params: new URLSearchParams() };
  const [route = "", query = ""] = location.hash.slice(2).split("?");
  const [path = "", id = ""] = route.split("/");
  return { path: decodeURIComponent(path), id: decodeURIComponent(id), params: new URLSearchParams(query) };
}

function renderBreadcrumbs(label) {
  return `<nav class="breadcrumbs" aria-label="Навигация по сайту"><a href="#/home">Главная</a><span>›</span><span>${escapeHTML(label)}</span></nav>`;
}

function renderRouteHeading(kicker, title, description = "") {
  return `<header class="route-heading"><div><span class="section-kicker">${escapeHTML(kicker)}</span><h1>${escapeHTML(title)}</h1>${description ? `<p>${escapeHTML(description)}</p>` : ""}</div></header>`;
}

function renderRouteProducts(target, cards, message = "В этой категории пока нет товаров.") {
  const grid = target.querySelector(".product-grid");
  const empty = target.querySelector(".empty-message");
  cards.forEach((card) => {
    const copy = card.cloneNode(true);
    const favorite = copy.querySelector(".favorite-button");
    const isFavorite = favoriteIds.has(card.dataset.id);
    favorite.classList.toggle("is-favorite", isFavorite);
    favorite.textContent = isFavorite ? "♥" : "♡";
    favorite.setAttribute("aria-pressed", String(isFavorite));
    grid.append(copy);
  });
  if (empty) {
    empty.textContent = message;
    empty.hidden = cards.length > 0;
  }
}

function getRouteProduct(id) {
  return productCards.find((card) => card.dataset.id === id);
}

function renderCatalogPage(params, promotionsOnly = false) {
  const requestedCategory = params.get("category") || "all";
  const query = params.get("q")?.trim() || "";
  const categoryAliases = {
    "Скидки недели": "all",
    "Специальные предложения": "all",
    Новинки: "all",
    "Хиты продаж": "all",
    "Часто покупают": "all",
    Рекомендуем: "all",
    "Вода и напитки": "Напитки",
    "Молоко, масло и яйца": "Молочные продукты",
    "Молочная продукция": "Молочные продукты",
    "Готовые блюда": "Кулинария",
    "Сырники и десерты": "Кулинария",
    "Фермерские продукты": "Молочные продукты",
  };
  const productCategory = categoryAliases[requestedCategory] || requestedCategory;
  const title = promotionsOnly ? "Акции и скидки" : requestedCategory === "all" ? "Каталог продуктов" : requestedCategory;
  const heading = promotionsOnly
    ? renderRouteHeading("Успейте попробовать", title, "Любимые продукты по специальным ценам. Предложения обновляются каждую неделю.")
    : renderRouteHeading("Свежие продукты каждый день", title, "Выбирайте продукты от проверенных фермеров и местных производителей.");
  pageView.innerHTML = `${renderBreadcrumbs(title)}${heading}
    ${promotionsOnly ? `<div class="route-promo-banner"><span>Выгодные предложения</span><strong>Вкусное — по приятной цене</strong><p>Собрали свежие скидки на продукты, которые вы любите.</p></div>` : ""}
    <section class="route-products">
      <div class="catalog-toolbar">
        <span class="catalog-result-count"></span>
        <label class="sort-control">Сортировка
          <select aria-label="Сортировка товаров">
            <option value="popular">По популярности</option>
            <option value="price-up">Сначала дешевле</option>
            <option value="price-down">Сначала дороже</option>
          </select>
        </label>
      </div>
      <div class="product-grid route-product-grid"></div>
      <p class="empty-message" hidden>${escapeHTML(query ? "По вашему запросу ничего не найдено." : "В этой категории пока нет товаров.")}</p>
    </section>`;

  const normalizedQuery = query.toLocaleLowerCase("ru");
  const products = productCards.filter((card) => {
    const categoryMatch = productCategory === "all" || productCategory === "Акции"
      || card.dataset.category === productCategory
      || card.dataset.name.toLocaleLowerCase("ru").includes(productCategory.toLocaleLowerCase("ru"));
    const queryMatch = !normalizedQuery
      || `${card.dataset.name} ${card.dataset.category}`.toLocaleLowerCase("ru").includes(normalizedQuery);
    return categoryMatch && queryMatch && (!promotionsOnly || card.querySelector(".discount-badge"));
  });
  renderRouteProducts(pageView, products);
  pageView.querySelector(".catalog-result-count").textContent = `Найдено товаров: ${products.length}`;
  const sort = pageView.querySelector(".sort-control select");
  sort.addEventListener("change", () => {
    const sorted = [...products];
    if (sort.value === "price-up") sorted.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    if (sort.value === "price-down") sorted.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    pageView.querySelector(".route-product-grid").replaceChildren(...sorted.map((card) => {
      const copy = card.cloneNode(true);
      const favorite = copy.querySelector(".favorite-button");
      const isFavorite = favoriteIds.has(card.dataset.id);
      favorite.classList.toggle("is-favorite", isFavorite);
      favorite.textContent = isFavorite ? "♥" : "♡";
      favorite.setAttribute("aria-pressed", String(isFavorite));
      return copy;
    }));
    pageView.querySelector(".empty-message").hidden = sorted.length > 0;
  });
}

function renderProductPage(id) {
  const card = getRouteProduct(id);
  if (!card) {
    renderNotFoundPage();
    return;
  }
  const name = card.querySelector(".product-card__info h3").textContent;
  const image = card.querySelector(".product-card__photo img");
  const price = card.querySelector(".product-card__price strong").textContent;
  const oldPrice = card.querySelector(".product-card__price del")?.textContent || "";
  const category = card.dataset.category;
  const isFavorite = favoriteIds.has(id);
  pageView.innerHTML = `${renderBreadcrumbs(name)}
    <section class="product-detail">
      <div class="product-detail__image"><span class="discount-badge">${escapeHTML(card.querySelector(".discount-badge")?.textContent || "В наличии")}</span><img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}"></div>
      <div class="product-detail__info"><span class="section-kicker">${escapeHTML(category)}</span><h1>${escapeHTML(name)}</h1><div class="product-rating"><span>★★★★★</span> 4.9 <span class="muted">(124 отзыва)</span></div><p class="product-detail__description">Свежий и качественный продукт от проверенных поставщиков. Бережно отобран и доставлен в магазин, чтобы порадовать вас и ваших близких.</p>
        <ul class="product-facts"><li>✓ Натуральный состав</li><li>✓ Свежая поставка</li><li>✓ Контроль качества</li></ul>
        <div class="product-detail__prices"><strong>${escapeHTML(price)}</strong><del>${escapeHTML(oldPrice)}</del></div>
        <div class="product-detail__actions"><button class="add-button" data-detail-add="${escapeHTML(id)}" type="button">В корзину <span>+</span></button><button class="favorite-button ${isFavorite ? "is-favorite" : ""}" type="button" data-detail-favorite="${escapeHTML(id)}" aria-label="Добавить в избранное" aria-pressed="${isFavorite}">${isFavorite ? "♥" : "♡"}</button></div>
        <button class="text-link" type="button" data-dialog="delivery-dialog">Уточнить доставку и наличие →</button>
      </div>
    </section>
    <section class="product-description-section"><span class="section-kicker">Хороший выбор</span><h2>О продукте</h2><p>Мы выбираем продукты с заботой о вкусе и качестве. Пищевая ценность и состав указаны на упаковке товара.</p></section>
    <section class="related-products"><div class="section-heading"><div><span class="section-kicker">Для вашего стола</span><h2>Вам может понравиться</h2></div><a class="all-link" href="#/catalog">В каталог <span>→</span></a></div><div class="product-grid related-product-grid"></div></section>`;
  const related = productCards.filter((item) => item !== card && item.dataset.category === category).slice(0, 4);
  renderRouteProducts(pageView, related.length ? related : productCards.filter((item) => item !== card).slice(0, 4));
}

function renderStoresPage() {
  pageView.innerHTML = `${renderBreadcrumbs("Магазины")}${renderRouteHeading("Всегда рядом", "Наши магазины", "Выбирайте свежие продукты в удобном магазине рядом с вами.")}
    <section class="stores-search"><label for="store-city">Найти магазин по городу или адресу</label><div><input id="store-city" type="search" placeholder="Введите город или улицу"><button type="button" class="checkout-button" data-store-search>Найти</button></div></section>
    <div class="stores-layout"><div class="store-list">
      <article class="store-card" data-search="москва большая тульская 13"><span class="store-card__badge">Открыто</span><h2>Ильинский на Большой Тульской</h2><p>📍 Москва, Большая Тульская ул., 13</p><p>🕘 Ежедневно, 08:00–22:00</p><a href="tel:+78005553535">8 800 555-35-35</a><button type="button" class="text-link" data-store-select>Выбрать этот магазин →</button></article>
      <article class="store-card" data-search="москва ленинградский проспект 36"><span class="store-card__badge">Открыто</span><h2>Ильинский на Ленинградском</h2><p>📍 Москва, Ленинградский пр-т, 36</p><p>🕘 Ежедневно, 09:00–22:00</p><a href="tel:+78005553535">8 800 555-35-35</a><button type="button" class="text-link" data-store-select>Выбрать этот магазин →</button></article>
      <article class="store-card" data-search="москва новый арбат 21"><span class="store-card__badge">Открыто</span><h2>Ильинский на Новом Арбате</h2><p>📍 Москва, Новый Арбат, 21</p><p>🕘 Ежедневно, 08:00–23:00</p><a href="tel:+78005553535">8 800 555-35-35</a><button type="button" class="text-link" data-store-select>Выбрать этот магазин →</button></article>
    </div><div class="map-placeholder" role="img" aria-label="Схематичная карта магазинов в Москве"><span class="map-road map-road--one"></span><span class="map-road map-road--two"></span><span class="map-road map-road--three"></span><span class="map-pin map-pin--one">📍</span><span class="map-pin map-pin--two">📍</span><span class="map-pin map-pin--three">📍</span><span class="map-label">Москва</span></div></div>
    <p class="empty-message stores-empty" hidden>По этому адресу магазинов не найдено.</p>`;
}

function renderVacanciesPage() {
  const vacancies = [
    ["Продавец-консультант", "Магазины · Полный день", "от 65 000 ₽"],
    ["Пекарь", "Собственное производство · Сменный график", "от 72 000 ₽"],
    ["Сборщик онлайн-заказов", "Магазины · Гибкий график", "от 60 000 ₽"],
    ["Администратор магазина", "Розничная сеть · Полный день", "от 90 000 ₽"],
  ];
  pageView.innerHTML = `${renderBreadcrumbs("Вакансии")}${renderRouteHeading("Работа с заботой", "Вакансии", "Присоединяйтесь к команде «Ильинского» — мы ценим людей и любим хорошую еду.")}
    <section class="careers-banner"><span>Работа, которой можно гордиться</span><h2>Растём вместе и создаём вкусное будущее</h2><p>Стабильность, поддержка команды и возможности для развития.</p><a href="#vacancy-list" class="hero-banner__button">Смотреть вакансии <span>↓</span></a></section>
    <section id="vacancy-list" class="vacancies-section"><div class="section-heading"><div><span class="section-kicker">Найдите своё</span><h2>Открытые вакансии</h2></div><span class="vacancy-count">${vacancies.length} вакансии</span></div><div class="vacancy-grid">${vacancies.map(([title, details, salary]) => `<article class="vacancy-card"><span class="vacancy-card__icon">✦</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(details)}</p><strong>${escapeHTML(salary)}</strong><a href="#/contacts?subject=${encodeURIComponent(title)}" class="vacancy-apply">Откликнуться <span>→</span></a></article>`).join("")}</div></section>
    <section class="career-note"><h2>Не нашли подходящую вакансию?</h2><p>Расскажите о себе — мы свяжемся, когда появится подходящая возможность.</p><a href="#/contacts?subject=Работа%20в%20Ильинском" class="outline-link">Написать нам</a></section>`;
}

function renderContactsPage(params) {
  pageView.innerHTML = `${renderBreadcrumbs("Контакты")}${renderRouteHeading("Мы всегда на связи", "Контакты", "Поможем с заказом, доставкой и ответим на любые вопросы.")}
    <section class="contact-layout"><div class="contact-details">
      <article><span>Позвоните нам</span><a href="tel:+78005553535">8 800 555-35-35</a><small>Бесплатно по России, ежедневно 09:00–21:00</small></article>
      <article><span>Напишите нам</span><a href="mailto:hello@ilinskiy.shop">hello@ilinskiy.shop</a><small>Ответим в течение рабочего дня</small></article>
      <article><span>Наш адрес</span><strong>Москва, Большая Тульская ул., 13</strong><small>Центральный офис «Ильинского»</small></article>
      <div class="contact-social"><span>Следите за нами</span><a href="#/contacts" aria-label="Telegram">✈</a><a href="#/contacts" aria-label="ВКонтакте">вк</a></div>
    </div><form class="route-form contact-form" data-form="contact"><span class="section-kicker">Обратная связь</span><h2>Оставьте сообщение</h2><p>Заполните форму, и мы скоро с вами свяжемся.</p><label>Ваше имя<input name="name" required placeholder="Как к вам обращаться?"></label><label>Телефон или почта<input name="contact" required placeholder="+7 (___) ___-__-__"></label><label>Тема обращения<select name="subject"><option>Вопрос по заказу</option><option>Доставка</option><option>Сотрудничество</option><option>Работа в Ильинском</option></select></label><label>Сообщение<textarea name="message" rows="4" placeholder="Напишите ваш вопрос"></textarea></label><button class="checkout-button" type="submit">Отправить сообщение</button><small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small></form></section>`;
  const subject = params.get("subject");
  if (subject) pageView.querySelector('select[name="subject"]').value = subject;
}

function renderAccountPage() {
  pageView.innerHTML = `${renderBreadcrumbs("Личный кабинет")}${renderRouteHeading("Ваши покупки под рукой", "Личный кабинет", "Войдите, чтобы следить за заказами и сохранять любимые продукты.")}
    <section class="account-layout"><div class="account-benefits"><span class="account-benefits__icon">♡</span><h2>Ваш «Ильинский»</h2><p>Всё важное о покупках — в одном месте.</p><ul><li>История и статус заказов</li><li>Список любимых продуктов</li><li>Персональные предложения</li></ul><a href="#/favorites" class="text-link">Перейти в избранное →</a></div>
    <form class="route-form account-form" data-form="account"><span class="section-kicker">Добро пожаловать</span><h2>Войти по номеру телефона</h2><p>Отправим одноразовый код подтверждения.</p><label>Номер телефона<input name="phone" type="tel" required placeholder="+7 (___) ___-__-__"></label><button type="submit" class="checkout-button">Получить код</button><small>Это демонстрационная форма, отправка SMS пока не подключена.</small></form></section>`;
}

function renderFavoritesPage() {
  const favorites = productCards.filter((card) => favoriteIds.has(card.dataset.id));
  pageView.innerHTML = `${renderBreadcrumbs("Избранное")}${renderRouteHeading("Сохранённое для вас", "Избранное", "Все продукты, которые вы отметили сердечком.")}
    <section class="route-products"><div class="product-grid route-product-grid"></div><div class="empty-state favorites-empty" ${favorites.length ? "hidden" : ""}><span>♡</span><h2>Пока ничего нет</h2><p>Нажмите на сердечко у товара, чтобы сохранить его здесь.</p><a href="#/catalog" class="checkout-button">Перейти в каталог</a></div></section>`;
  renderRouteProducts(pageView, favorites);
}

function renderCartPage() {
  const items = [...cart.values()];
  const total = items.reduce((sum, item) => sum + Number(item.card.dataset.price) * item.quantity, 0);
  pageView.innerHTML = `${renderBreadcrumbs("Корзина")}${renderRouteHeading("Ваш заказ", "Корзина", "Проверьте товары и количество перед оформлением.")}
    ${items.length ? `<section class="full-cart-layout"><div class="full-cart-items">${items.map(({ card, quantity }) => `<article class="full-cart-item" data-cart-id="${escapeHTML(card.dataset.id)}"><img src="${escapeHTML(card.querySelector(".product-card__photo img").src)}" alt=""><div><h2>${escapeHTML(card.querySelector(".product-card__info h3").textContent)}</h2><span>${escapeHTML(card.dataset.category)}</span><strong>${Number(card.dataset.price).toLocaleString("ru-RU")} ₽</strong></div><div class="quantity-control"><button type="button" data-cart-change="-1" aria-label="Уменьшить количество">−</button><span>${quantity}</span><button type="button" data-cart-change="1" aria-label="Увеличить количество">+</button></div></article>`).join("")}</div>
      <aside class="order-summary"><h2>Ваш заказ</h2><div><span>Товары, ${items.reduce((sum, item) => sum + item.quantity, 0)} шт.</span><span>${total.toLocaleString("ru-RU")} ₽</span></div><div><span>Доставка</span><span>Рассчитаем при оформлении</span></div><div class="order-summary__total"><strong>Итого</strong><strong>${total.toLocaleString("ru-RU")} ₽</strong></div><a href="#/checkout" class="checkout-button">Перейти к оформлению</a><a class="text-link" href="#/catalog">← Продолжить покупки</a></aside></section>` : `<div class="empty-state"><span>🛒</span><h2>Корзина пока пуста</h2><p>Добавьте любимые продукты — мы позаботимся об остальном.</p><a href="#/catalog" class="checkout-button">Перейти в каталог</a></div>`}`;
}

function renderCheckoutPage() {
  const items = [...cart.values()];
  const total = items.reduce((sum, item) => sum + Number(item.card.dataset.price) * item.quantity, 0);
  pageView.innerHTML = `${renderBreadcrumbs("Оформление заказа")}${renderRouteHeading("Остался последний шаг", "Оформление заказа", "Укажите данные для доставки или выберите самовывоз.")}
    ${items.length ? `<section class="checkout-layout"><form class="route-form checkout-form" data-form="checkout"><h2>Данные получателя</h2><div class="form-row"><label>Имя<input name="name" required placeholder="Ваше имя"></label><label>Телефон<input name="phone" type="tel" required placeholder="+7 (___) ___-__-__"></label></div><label>Способ получения<select name="delivery"><option value="delivery">Доставка курьером</option><option value="pickup">Самовывоз из магазина</option></select></label><label>Адрес доставки<input name="address" required placeholder="Город, улица, дом, квартира"></label><label>Комментарий к заказу<textarea name="comment" rows="3" placeholder="Подъезд, этаж, пожелания"></textarea></label><h2>Оплата</h2><label class="payment-option"><input type="radio" name="payment" value="card" checked> Картой при получении</label><label class="payment-option"><input type="radio" name="payment" value="cash"> Наличными при получении</label><button type="submit" class="checkout-button">Подтвердить заказ</button><small>Демо-режим: заказ не отправляется в магазин и оплата не производится.</small></form><aside class="order-summary"><h2>Ваш заказ</h2>${items.map(({ card, quantity }) => `<div><span>${escapeHTML(card.dataset.name)} × ${quantity}</span><span>${(Number(card.dataset.price) * quantity).toLocaleString("ru-RU")} ₽</span></div>`).join("")}<div class="order-summary__total"><strong>Итого</strong><strong>${total.toLocaleString("ru-RU")} ₽</strong></div><a class="text-link" href="#/cart">Изменить корзину</a></aside></section>` : `<div class="empty-state"><span>🛍️</span><h2>Сначала добавьте товары</h2><p>Выберите всё необходимое в каталоге и возвращайтесь к оформлению.</p><a href="#/catalog" class="checkout-button">Перейти в каталог</a></div>`}`;
}

function renderNotFoundPage() {
  pageView.innerHTML = `<section class="not-found" aria-labelledby="not-found-title">
    <span class="not-found__eyebrow">ошибка</span>
    <div class="not-found__code" aria-label="404">
      <span>4</span><span class="not-found__donut" role="img" aria-label="Розовый пончик с посыпкой"></span><span>4</span>
    </div>
    <h1 id="not-found-title">Ой! Кажется, что-то пошло не так.</h1>
    <p>Страница, которую вы запрашиваете, не существует. Возможно, она устарела, была удалена или вы ввели неверный адрес в адресной строке.</p>
    <div class="not-found__actions"><a href="#/home" class="not-found__home">Перейти на главную</a><a href="#/catalog" class="not-found__catalog"><span aria-hidden="true">▤</span> Каталог</a></div>
  </section>`;
}

function renderRoute() {
  const { path, id, params } = currentRoute();
  if (path === "home") {
    pageView.hidden = true;
    homeView.hidden = false;
    document.title = routeTitles.home;
    showHeroSlide(0);
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  homeView.hidden = true;
  pageView.hidden = false;
  switch (path) {
    case "catalog":
      renderCatalogPage(params);
      break;
    case "product":
      renderProductPage(id || params.get("id"));
      break;
    case "promotions":
      renderCatalogPage(params, true);
      break;
    case "stores":
      renderStoresPage();
      break;
    case "vacancies":
      renderVacanciesPage();
      break;
    case "contacts":
      renderContactsPage(params);
      break;
    case "account":
      renderAccountPage();
      break;
    case "favorites":
      renderFavoritesPage();
      break;
    case "cart":
      renderCartPage();
      break;
    case "checkout":
      renderCheckoutPage();
      break;
    case "order":
      pageView.innerHTML = `${renderBreadcrumbs("Заказ оформлен")}<section class="order-success"><span>✓</span><h1>Спасибо за заказ!</h1><p>Номер заказа ${escapeHTML(params.get("id") || "—")}. Это демонстрация оформления — магазин не получил заказ.</p><a href="#/catalog" class="checkout-button">Продолжить покупки</a></section>`;
      break;
    default:
      renderNotFoundPage();
  }
  document.title = `${routeTitles[path] || routeTitles["404"]} — Ильинский онлайн`;
  window.scrollTo({ top: 0, behavior: "instant" });
}

pageView.addEventListener("click", (event) => {
  const target = event.target;
  const addButton = target.closest(".add-button");
  const favoriteButton = target.closest(".favorite-button");
  const cartChange = target.closest("[data-cart-change]");
  const productLink = target.closest(".product-card__photo img, .product-card__info h3");

  if (addButton) {
    const card = addButton.dataset.detailAdd
      ? getRouteProduct(addButton.dataset.detailAdd)
      : addButton.closest(".product-card") && getRouteProduct(addButton.closest(".product-card").dataset.id);
    if (card) {
      changeQuantity(card, 1);
      showToast(`${card.dataset.name} добавлен в корзину`);
    }
  } else if (favoriteButton) {
    const cardId = favoriteButton.dataset.detailFavorite || favoriteButton.closest(".product-card")?.dataset.id;
    const card = getRouteProduct(cardId);
    if (card) toggleFavorite(card, favoriteButton);
  } else if (productLink) {
    const card = productLink.closest(".product-card");
    if (card?.dataset.id) location.hash = `#/product/${encodeURIComponent(card.dataset.id)}`;
  } else if (cartChange) {
    const item = cartChange.closest(".full-cart-item");
    const card = getRouteProduct(item.dataset.cartId);
    if (card) changeQuantity(card, Number(cartChange.dataset.cartChange));
  }

  const storeSelect = target.closest("[data-store-select]");
  if (storeSelect) {
    const storeName = storeSelect.closest(".store-card").querySelector("h2").textContent;
    document.querySelector(".delivery-button small").textContent = "Магазин выбран";
    showToast(`${storeName} выбран для самовывоза`);
  }
});

pageView.addEventListener("input", (event) => {
  if (event.target.id === "store-city") filterStoreList(event.target.value);
});
pageView.addEventListener("click", (event) => {
  if (event.target.closest("[data-store-search]")) filterStoreList(pageView.querySelector("#store-city").value);
});

function filterStoreList(query) {
  const normalized = query.trim().toLocaleLowerCase("ru");
  let visible = 0;
  pageView.querySelectorAll(".store-card").forEach((card) => {
    const matches = !normalized || card.dataset.search.includes(normalized);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  const empty = pageView.querySelector(".stores-empty");
  if (empty) empty.hidden = visible > 0;
}

pageView.addEventListener("submit", (event) => {
  const form = event.target.closest(".route-form");
  if (!form) return;
  event.preventDefault();

  if (form.dataset.form === "checkout") {
    const orderId = String(Date.now()).slice(-6);
    cart.clear();
    updateCart();
    location.hash = `#/order?id=${orderId}`;
  } else if (form.dataset.form === "account") {
    showToast("Демо-режим: отправка SMS пока не подключена");
  } else {
    form.reset();
    showToast("Спасибо! Ваше сообщение принято");
  }
});

document.querySelectorAll('.suggestion-form, [data-form="newsletter"]').forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.dataset.form === "suggestion") {
      const type = new FormData(form).get("suggestion-type");
      showToast(`Спасибо! Предложение «${type}» отправлено`);
    } else {
      showToast("Спасибо за подписку на наши новости!");
    }
    form.reset();
  });
});

function toggleFavorite(card, button) {
  const isFavorite = !favoriteIds.has(card.dataset.id);
  if (isFavorite) favoriteIds.add(card.dataset.id);
  else favoriteIds.delete(card.dataset.id);
  button.classList.toggle("is-favorite", isFavorite);
  button.textContent = isFavorite ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(isFavorite));
  showToast(isFavorite ? "Добавлено в избранное" : "Удалено из избранного");
}

window.addEventListener("hashchange", () => {
  if (!location.hash || location.hash.startsWith("#/")) renderRoute();
});
renderRoute();