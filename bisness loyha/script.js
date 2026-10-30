const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    mainNav.classList.toggle('is-open', isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
      mainNav.classList.remove('is-open');
    });
  });
}

const themeToggle = document.querySelector('#theme-toggle');
const themeStorageKey = 'drivepoint-theme';
const textScaleKey = 'drivepoint-text-scale';
const textScaleValue = document.querySelector('#text-scale-value');
const textSmaller = document.querySelector('#text-smaller');
const textLarger = document.querySelector('#text-larger');
const textReset = document.querySelector('#text-reset');
const textScaleSteps = [0.9, 1, 1.1, 1.2, 1.3];
let textScale = 1;

function updateTextScale(nextScale) {
  textScale = textScaleSteps.reduce((closest, step) => (
    Math.abs(step - nextScale) < Math.abs(closest - nextScale) ? step : closest
  ), textScaleSteps[0]);
  document.documentElement.style.setProperty('--text-scale', `${Math.round(textScale * 100)}%`);
  if (textScaleValue) textScaleValue.value = `${Math.round(textScale * 100)}%`;
  if (textSmaller) textSmaller.disabled = textScale <= textScaleSteps[0];
  if (textLarger) textLarger.disabled = textScale >= textScaleSteps[textScaleSteps.length - 1];
}

try {
  const savedScale = Number(localStorage.getItem(textScaleKey));
  updateTextScale(Number.isFinite(savedScale) && savedScale > 0 ? savedScale : 1);
} catch (error) {
  console.error('Не удалось загрузить настройку размера текста.', error);
  updateTextScale(1);
}

function saveTextScale() {
  try {
    localStorage.setItem(textScaleKey, String(textScale));
  } catch (error) {
    console.error('Не удалось сохранить настройку размера текста.', error);
    showToast('Размер текста изменён, но настройка не сохранится.');
  }
}

if (textSmaller) {
  textSmaller.addEventListener('click', () => {
    const currentIndex = textScaleSteps.indexOf(textScale);
    updateTextScale(textScaleSteps[Math.max(0, currentIndex - 1)]);
    saveTextScale();
  });
}

if (textLarger) {
  textLarger.addEventListener('click', () => {
    const currentIndex = textScaleSteps.indexOf(textScale);
    updateTextScale(textScaleSteps[Math.min(textScaleSteps.length - 1, currentIndex + 1)]);
    saveTextScale();
  });
}

if (textReset) {
  textReset.addEventListener('click', () => {
    updateTextScale(1);
    saveTextScale();
  });
}

function setTheme(theme) {
  const isLight = theme === 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Включить тёмную тему' : 'Включить светлую тему');
    themeToggle.title = isLight ? 'Включить тёмную тему' : 'Включить светлую тему';
    const label = themeToggle.querySelector('.theme-toggle-label');
    const icon = themeToggle.querySelector('.theme-toggle-icon');
    if (label) label.textContent = isLight ? 'Тёмная тема' : 'Светлая тема';
    if (icon) icon.textContent = isLight ? '☾' : '☼';
  }
}

try {
  const savedTheme = localStorage.getItem(themeStorageKey);
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
} catch (error) {
  console.error('Не удалось загрузить настройку темы.', error);
  setTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem(themeStorageKey, nextTheme);
    } catch (error) {
      console.error('Не удалось сохранить настройку темы.', error);
      showToast('Тема изменена, но настройка не сохранится после закрытия страницы.');
    }
  });
}

const faqList = document.querySelector('.faq-list');

if (faqList) {
  faqList.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const toggle = target.closest('.faq-toggle');
    if (!toggle) return;
    const answerId = toggle.getAttribute('aria-controls');
    const answer = answerId ? document.getElementById(answerId) : null;
    if (!answer) return;
    const isOpening = toggle.getAttribute('aria-expanded') !== 'true';

    faqList.querySelectorAll('.faq-toggle[aria-expanded="true"]').forEach((openToggle) => {
      if (openToggle === toggle) return;
      openToggle.setAttribute('aria-expanded', 'false');
      const openAnswerId = openToggle.getAttribute('aria-controls');
      const openAnswer = openAnswerId ? document.getElementById(openAnswerId) : null;
      if (openAnswer) openAnswer.hidden = true;
      const openItem = openToggle.closest('.faq-item');
      if (openItem) openItem.classList.remove('is-open');
      const symbol = openToggle.querySelector('span');
      if (symbol) symbol.textContent = '＋';
    });

    toggle.setAttribute('aria-expanded', String(isOpening));
    answer.hidden = !isOpening;
    const item = toggle.closest('.faq-item');
    if (item) item.classList.toggle('is-open', isOpening);
    const symbol = toggle.querySelector('span');
    if (symbol) symbol.textContent = isOpening ? '−' : '＋';
  });
}

const trustList = document.querySelector('.trust-list');

if (trustList) {
  trustList.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const toggle = target.closest('.trust-toggle');
    if (!toggle) return;

    const panelId = toggle.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;
    const isOpening = toggle.getAttribute('aria-expanded') !== 'true';

    trustList.querySelectorAll('.trust-toggle[aria-expanded="true"]').forEach((openToggle) => {
      if (openToggle === toggle) return;
      openToggle.setAttribute('aria-expanded', 'false');
      const openPanelId = openToggle.getAttribute('aria-controls');
      const openPanel = openPanelId ? document.getElementById(openPanelId) : null;
      if (openPanel) openPanel.hidden = true;
      const openArticle = openToggle.closest('article');
      if (openArticle) openArticle.classList.remove('is-expanded');
      const symbol = openArticle ? openArticle.querySelector('.trust-symbol') : null;
      if (symbol) symbol.textContent = '＋';
    });

    toggle.setAttribute('aria-expanded', String(isOpening));
    panel.hidden = !isOpening;
    const article = toggle.closest('article');
    if (article) article.classList.toggle('is-expanded', isOpening);
    const symbol = article ? article.querySelector('.trust-symbol') : null;
    if (symbol) symbol.textContent = isOpening ? '−' : '＋';
  });
}

const carGrid = document.querySelector('#car-grid');
const carCards = carGrid ? Array.from(carGrid.querySelectorAll('.car-card')) : [];
const filterButtons = document.querySelectorAll('.filter-button');
const carSearch = document.querySelector('#car-search');
const carSort = document.querySelector('#car-sort');
const emptyState = document.querySelector('#empty-state');
const inventoryCount = document.querySelector('#inventory-count');
const favoritesToggle = document.querySelector('#favorites-toggle');
const favoritesCount = document.querySelector('#favorites-count');
const maxPriceInput = document.querySelector('#max-price');
const maxPriceLabel = document.querySelector('#max-price-label');
const resetFilters = document.querySelector('#reset-filters');
const compareBar = document.querySelector('#compare-bar');
const compareCount = document.querySelector('#compare-count');
const compareOpen = document.querySelector('#compare-open');
const compareClear = document.querySelector('#compare-clear');
const comparisonDialog = document.querySelector('#comparison-dialog');
const comparisonBody = document.querySelector('#comparison-body');
const comparisonClose = document.querySelector('#comparison-close');
const toast = document.querySelector('#site-toast');
const backToTop = document.querySelector('#back-to-top');
const readingProgress = document.querySelector('#reading-progress');
const recentlyViewed = document.querySelector('#recently-viewed');
const recentlyList = document.querySelector('#recently-list');
const recentlyClear = document.querySelector('#recently-clear');
const footerCopyPhone = document.querySelector('#footer-copy-phone');
const footerShare = document.querySelector('#footer-share');
const footerPrint = document.querySelector('#footer-print');
const footerExportFavorites = document.querySelector('#footer-export-favorites');
const favoriteStorageKey = 'drivepoint-favorites';
let activeFilter = 'all';
let showFavoritesOnly = false;
let favorites = new Set();
const comparedCars = new Set();
let toastTimeout;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.toggle('compare-active', comparedCars.size > 0);
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => {
      if (!toast.classList.contains('is-visible')) toast.hidden = true;
    }, 220);
  }, 2600);
}

async function copyText(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
      return;
    } catch {
      // The legacy copy path below handles browsers that deny clipboard access.
    }
  }

  const temporaryField = document.createElement('textarea');
  temporaryField.value = text;
  temporaryField.setAttribute('readonly', '');
  temporaryField.style.position = 'fixed';
  temporaryField.style.opacity = '0';
  document.body.append(temporaryField);
  let copied = false;
  try {
    temporaryField.select();
    copied = document.execCommand('copy');
  } catch (error) {
    console.error('Браузер не разрешил скопировать текст.', error);
  } finally {
    temporaryField.remove();
  }

  if (copied) {
    showToast(successMessage);
  } else {
    showToast('Не удалось скопировать автоматически. Выделите текст и скопируйте вручную.');
  }
}

function formatPrice(value) {
  return `${Number(value).toLocaleString('ru-RU')} ₽`;
}

function getCarName(card) {
  const make = card.querySelector('.car-make');
  const title = card.querySelector('.car-title-row h3');
  return `${make ? make.textContent : ''} ${title ? title.textContent : ''}`.trim();
}

const recentStorageKey = 'drivepoint-recent-cars';
let recentCarIds = [];

try {
  const savedRecent = JSON.parse(localStorage.getItem(recentStorageKey) || '[]');
  if (Array.isArray(savedRecent)) {
    recentCarIds = savedRecent.filter((id) => typeof id === 'string').slice(0, 5);
  }
} catch (error) {
  console.error('Не удалось загрузить историю просмотров.', error);
}

function renderRecentlyViewed() {
  if (!recentlyViewed || !recentlyList) return;
  const recentCards = recentCarIds
    .map((id) => carCards.find((card) => card.dataset.search === id))
    .filter((card) => Boolean(card))
    .slice(0, 5);

  recentlyList.replaceChildren();
  recentlyViewed.hidden = recentCards.length === 0;
  recentCards.forEach((card) => {
    const recentButton = document.createElement('button');
    recentButton.className = 'recent-card';
    recentButton.type = 'button';
    recentButton.dataset.recentCar = card.dataset.search || '';
    recentButton.setAttribute('aria-label', `Снова открыть ${getCarName(card)}`);

    const image = card.querySelector('.car-image img');
    if (image) {
      const thumbnail = document.createElement('img');
      thumbnail.src = image.currentSrc || image.src;
      thumbnail.alt = '';
      thumbnail.loading = 'lazy';
      recentButton.append(thumbnail);
    }

    const details = document.createElement('span');
    details.className = 'recent-card-details';
    const name = document.createElement('strong');
    name.textContent = getCarName(card);
    const price = document.createElement('span');
    price.textContent = formatPrice(card.dataset.price);
    details.append(name, price);
    recentButton.append(details);
    recentlyList.append(recentButton);
  });
}

function rememberViewedCar(card) {
  const id = card.dataset.search || '';
  if (!id) return;
  recentCarIds = [id, ...recentCarIds.filter((recentId) => recentId !== id)].slice(0, 5);
  try {
    localStorage.setItem(recentStorageKey, JSON.stringify(recentCarIds));
  } catch (error) {
    console.error('Не удалось сохранить историю просмотров.', error);
    showToast('Не удалось сохранить историю просмотров в этом браузере.');
  }
  renderRecentlyViewed();
}

function updateComparisonControls() {
  carCards.forEach((card) => {
    const button = card.querySelector('.compare-card-button');
    if (!button) return;
    const isCompared = comparedCars.has(card.dataset.search || '');
    button.classList.toggle('is-selected', isCompared);
    button.setAttribute('aria-pressed', String(isCompared));
    button.textContent = isCompared ? '✓ В сравнении' : '⇄ Сравнить';
  });

  if (compareCount) compareCount.textContent = String(comparedCars.size);
  if (compareBar) compareBar.hidden = comparedCars.size === 0;
  if (compareOpen) compareOpen.disabled = comparedCars.size < 2;
  if (backToTop) backToTop.classList.toggle('compare-active', comparedCars.size > 0);
}

if (maxPriceInput && carCards.length > 0) {
  const highestPrice = Math.max(...carCards.map((card) => Number(card.dataset.price) || 0));
  maxPriceInput.max = String(Math.ceil(highestPrice / 100000) * 100000);
  maxPriceInput.value = maxPriceInput.max;
}

function updateBudgetLabel() {
  if (maxPriceInput && maxPriceLabel) maxPriceLabel.textContent = formatPrice(maxPriceInput.value);
}

function renderComparison() {
  if (!comparisonBody) return;
  comparisonBody.replaceChildren();
  const selectedCards = carCards.filter((card) => comparedCars.has(card.dataset.search || ''));

  const headerRow = document.createElement('tr');
  const headerLabel = document.createElement('th');
  headerLabel.scope = 'col';
  headerLabel.textContent = 'Автомобиль';
  headerRow.append(headerLabel);

  selectedCards.forEach((card) => {
    const cell = document.createElement('th');
    cell.scope = 'col';
    const image = card.querySelector('.car-image img');
    if (image) {
      const thumbnail = document.createElement('img');
      thumbnail.src = image.currentSrc || image.src;
      thumbnail.alt = image.alt;
      cell.append(thumbnail);
    }

    const name = document.createElement('strong');
    name.textContent = getCarName(card);
    cell.append(name);

    const removeButton = document.createElement('button');
    removeButton.className = 'compare-remove';
    removeButton.type = 'button';
    removeButton.dataset.compareRemove = card.dataset.search || '';
    removeButton.textContent = 'Убрать';
    cell.append(removeButton);
    headerRow.append(cell);
  });
  comparisonBody.append(headerRow);

  const rows = [
    ['Цена', (card) => formatPrice(card.dataset.price)],
    ['Год выпуска', (card) => card.dataset.year || '—'],
    ['Тип кузова', (card) => card.dataset.type === 'suv' ? 'Кроссовер' : card.dataset.type === 'sedan' ? 'Седан' : 'Электро'],
    ['Пробег', (card) => {
      const specs = card.querySelector('.car-specs');
      return specs ? (specs.textContent.match(/[\d ]+\s*км/) || ['—'])[0].trim() : '—';
    }],
    ['Коробка передач', (card) => {
      const specs = card.querySelector('.car-specs');
      return specs ? Array.from(specs.querySelectorAll('span')).at(-1)?.textContent || '—' : '—';
    }]
  ];

  rows.forEach(([label, getValue]) => {
    const row = document.createElement('tr');
    const rowLabel = document.createElement('th');
    rowLabel.scope = 'row';
    rowLabel.textContent = label;
    row.append(rowLabel);
    selectedCards.forEach((card) => {
      const cell = document.createElement('td');
      cell.textContent = getValue(card);
      row.append(cell);
    });
    comparisonBody.append(row);
  });
}

try {
  const savedFavorites = JSON.parse(localStorage.getItem(favoriteStorageKey) || '[]');
  if (Array.isArray(savedFavorites)) {
    favorites = new Set(savedFavorites.filter((favorite) => typeof favorite === 'string'));
  }
} catch (error) {
  console.error('Не удалось загрузить избранные автомобили из хранилища браузера.', error);
}

function updateFavoriteButtons() {
  carCards.forEach((card) => {
    const button = card.querySelector('.favorite-button');
    const isFavorite = favorites.has(card.dataset.search || '');
    if (!button) return;
    button.classList.toggle('is-favorite', isFavorite);
    button.setAttribute('aria-pressed', String(isFavorite));
    button.setAttribute('aria-label', isFavorite ? 'Убрать из избранного' : 'Добавить в избранное');
    button.textContent = isFavorite ? '♥' : '♡';
  });

  if (favoritesCount) favoritesCount.textContent = String(favorites.size);
  if (favoritesToggle) {
    favoritesToggle.setAttribute('aria-pressed', String(showFavoritesOnly));
    favoritesToggle.classList.toggle('is-active', showFavoritesOnly);
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(favoriteStorageKey, JSON.stringify(Array.from(favorites)));
  } catch (error) {
    console.error('Не удалось сохранить избранные автомобили в хранилище браузера.', error);
  }
}

function sortCars(cards) {
  const sortBy = carSort ? carSort.value : 'featured';
  const sortedCards = [...cards];

  if (sortBy === 'price-asc') {
    sortedCards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
  } else if (sortBy === 'price-desc') {
    sortedCards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
  } else if (sortBy === 'year-desc') {
    sortedCards.sort((a, b) => Number(b.dataset.year) - Number(a.dataset.year));
  } else {
    sortedCards.sort((a, b) => carCards.indexOf(a) - carCards.indexOf(b));
  }

  sortedCards.forEach((card) => carGrid.append(card));
}

function filterCars() {
  const searchTerm = carSearch ? carSearch.value.trim().toLocaleLowerCase('ru') : '';
  const maxPrice = maxPriceInput ? Number(maxPriceInput.value) : Number.POSITIVE_INFINITY;
  const matchingCards = carCards.filter((card) => {
    const matchesType = activeFilter === 'all' || card.dataset.type === activeFilter;
    const matchesSearch = !searchTerm || (card.dataset.search || '').toLocaleLowerCase('ru').includes(searchTerm);
    const matchesFavorites = !showFavoritesOnly || favorites.has(card.dataset.search || '');
    const matchesBudget = Number(card.dataset.price) <= maxPrice;
    return matchesType && matchesSearch && matchesFavorites && matchesBudget;
  });

  sortCars(matchingCards);
  const visibleCards = new Set(matchingCards);
  carCards.forEach((card) => {
    card.hidden = !visibleCards.has(card);
  });

  if (emptyState) emptyState.hidden = matchingCards.length > 0;
  if (inventoryCount) {
    inventoryCount.textContent = `Показано автомобилей: ${matchingCards.length} из ${carCards.length} · бюджет до ${formatPrice(maxPrice)}`;
  }
}

carCards.forEach((card) => {
  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'favorite-button';
  favoriteButton.type = 'button';
  favoriteButton.setAttribute('aria-pressed', 'false');
  card.append(favoriteButton);

  const compareButton = document.createElement('button');
  compareButton.className = 'compare-card-button';
  compareButton.type = 'button';
  compareButton.setAttribute('aria-pressed', 'false');
  const carInfo = card.querySelector('.car-info');
  if (carInfo) carInfo.append(compareButton);
});
updateFavoriteButtons();
updateBudgetLabel();
updateComparisonControls();
filterCars();
renderRecentlyViewed();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });
    filterCars();
  });
});

if (carSearch) carSearch.addEventListener('input', filterCars);
if (carSort) carSort.addEventListener('change', filterCars);
if (maxPriceInput) {
  maxPriceInput.addEventListener('input', () => {
    updateBudgetLabel();
    filterCars();
  });
}

if (resetFilters) {
  resetFilters.addEventListener('click', () => {
    activeFilter = 'all';
    showFavoritesOnly = false;
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === 'all';
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    if (carSearch) carSearch.value = '';
    if (carSort) carSort.value = 'featured';
    if (maxPriceInput) maxPriceInput.value = maxPriceInput.max;
    updateFavoriteButtons();
    updateBudgetLabel();
    filterCars();
  });
}

if (carGrid) {
  carGrid.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const compareButton = target.closest('.compare-card-button');
    if (compareButton) {
      const card = compareButton.closest('.car-card');
      const carId = card ? card.dataset.search || '' : '';
      if (!carId) return;
      if (comparedCars.has(carId)) {
        comparedCars.delete(carId);
      } else if (comparedCars.size >= 3) {
        showToast('Можно сравнить не больше трёх автомобилей.');
        return;
      } else {
        comparedCars.add(carId);
      }
      updateComparisonControls();
      return;
    }

    const favoriteButton = target.closest('.favorite-button');
    if (favoriteButton) {
      const card = favoriteButton.closest('.car-card');
      const favoriteId = card ? card.dataset.search || '' : '';
      if (favoriteId) {
        if (favorites.has(favoriteId)) favorites.delete(favoriteId);
        else favorites.add(favoriteId);
        saveFavorites();
        updateFavoriteButtons();
        filterCars();
      }
      return;
    }

    const openLink = target.closest('[data-open-car]');
    const card = openLink ? openLink.closest('.car-card') : null;
    if (card) {
      event.preventDefault();
      openCarDetails(card);
    }
  });
}

if (recentlyList) {
  recentlyList.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const recentButton = target.closest('[data-recent-car]');
    if (!recentButton) return;
    const card = carCards.find((candidate) => candidate.dataset.search === recentButton.dataset.recentCar);
    if (card) openCarDetails(card);
  });
}

if (recentlyClear) {
  recentlyClear.addEventListener('click', () => {
    recentCarIds = [];
    try {
      localStorage.removeItem(recentStorageKey);
      renderRecentlyViewed();
      showToast('История просмотренных автомобилей очищена.');
    } catch (error) {
      console.error('Не удалось очистить историю просмотров.', error);
      showToast('Не удалось очистить историю. Проверьте настройки хранилища браузера.');
    }
  });
}

if (compareClear) {
  compareClear.addEventListener('click', () => {
    comparedCars.clear();
    updateComparisonControls();
    if (comparisonDialog && comparisonDialog.open) comparisonDialog.close();
  });
}

if (compareOpen && comparisonDialog) {
  compareOpen.addEventListener('click', () => {
    if (comparedCars.size < 2) {
      showToast('Выберите минимум два автомобиля для сравнения.');
      return;
    }
    renderComparison();
    comparisonDialog.showModal();
  });
}

if (comparisonBody) {
  comparisonBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const removeButton = target.closest('[data-compare-remove]');
    if (!removeButton) return;
    comparedCars.delete(removeButton.dataset.compareRemove || '');
    updateComparisonControls();
    if (comparedCars.size < 2 && comparisonDialog && comparisonDialog.open) {
      comparisonDialog.close();
      showToast('Для таблицы сравнения выберите минимум два автомобиля.');
    } else {
      renderComparison();
    }
  });
}

if (comparisonClose && comparisonDialog) {
  comparisonClose.addEventListener('click', () => comparisonDialog.close());
  comparisonDialog.addEventListener('click', (event) => {
    if (event.target === comparisonDialog) comparisonDialog.close();
  });
}

const carInterest = document.querySelector('#car-interest');
const contactForm = document.querySelector('#contact-form');
const phoneInput = contactForm ? contactForm.querySelector('input[name="phone"]') : null;
const appointmentDate = document.querySelector('#appointment-date');
const appointmentTime = document.querySelector('#appointment-time');
const draftStatus = document.querySelector('#draft-status');
const draftClear = document.querySelector('#draft-clear');
const draftStorageKey = 'drivepoint-contact-draft';
let draftSaveTimeout;
const carDialog = document.querySelector('#car-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogMake = document.querySelector('#dialog-make');
const dialogTitle = document.querySelector('#car-dialog-title');
const dialogPrice = document.querySelector('#dialog-price');
const dialogSpecs = document.querySelector('#dialog-specs');
const dialogClose = document.querySelector('#dialog-close');
const dialogContact = document.querySelector('#dialog-contact');
const dialogFavorite = document.querySelector('#dialog-favorite');
const dialogShare = document.querySelector('#dialog-share');
const downPaymentInput = document.querySelector('#down-payment');
const downPaymentLabel = document.querySelector('#down-payment-label');
const loanTermInput = document.querySelector('#loan-term');
const loanTermLabel = document.querySelector('#loan-term-label');
const monthlyPayment = document.querySelector('#monthly-payment');
let selectedCar = null;

function updateDraftStatus(message) {
  if (draftStatus) draftStatus.textContent = message;
}

function saveContactDraft() {
  if (!contactForm) return;
  const draft = Object.fromEntries(new FormData(contactForm).entries());
  try {
    localStorage.setItem(draftStorageKey, JSON.stringify(draft));
    updateDraftStatus('Черновик сохранён в этом браузере.');
  } catch (error) {
    console.error('Не удалось сохранить черновик заявки.', error);
    updateDraftStatus('Не удалось сохранить черновик. Проверьте настройки хранилища браузера.');
  }
}

if (contactForm) {
  if (appointmentDate) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    appointmentDate.min = localDate;
  }

  try {
    const savedDraft = JSON.parse(localStorage.getItem(draftStorageKey) || 'null');
    if (savedDraft && typeof savedDraft === 'object' && !Array.isArray(savedDraft)) {
      Array.from(contactForm.elements).forEach((field) => {
        if ((field instanceof HTMLInputElement || field instanceof HTMLSelectElement) && field.name && typeof savedDraft[field.name] === 'string') {
          field.value = savedDraft[field.name];
        }
      });
      if (Object.values(savedDraft).some((value) => typeof value === 'string' && value.length > 0)) {
        updateDraftStatus('Восстановлен сохранённый черновик заявки.');
      }
    }
  } catch (error) {
    console.error('Не удалось восстановить черновик заявки.', error);
    updateDraftStatus('Черновик не удалось восстановить.');
  }

  contactForm.addEventListener('input', () => {
    updateDraftStatus('Сохраняем черновик…');
    window.clearTimeout(draftSaveTimeout);
    draftSaveTimeout = window.setTimeout(saveContactDraft, 300);
  });
}

if (draftClear && contactForm) {
  draftClear.addEventListener('click', () => {
    contactForm.reset();
    window.clearTimeout(draftSaveTimeout);
    try {
      localStorage.removeItem(draftStorageKey);
      updateDraftStatus('Черновик удалён. Поля очищены.');
    } catch (error) {
      console.error('Не удалось удалить черновик заявки.', error);
      updateDraftStatus('Поля очищены, но черновик не удалось удалить из хранилища.');
    }
    const formMessage = document.querySelector('#form-message');
    if (formMessage) formMessage.hidden = true;
  });
}

function updatePaymentEstimate() {
  if (!selectedCar || !downPaymentInput || !loanTermInput || !monthlyPayment) return;
  const price = Number(selectedCar.dataset.price);
  const downPaymentPercent = Number(downPaymentInput.value);
  const termMonths = Number(loanTermInput.value);
  const principal = price * (1 - downPaymentPercent / 100);
  const monthlyRate = 0.18 / 12;
  const payment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -termMonths));

  if (downPaymentLabel) downPaymentLabel.textContent = `${downPaymentPercent}% · ${formatPrice(price * downPaymentPercent / 100)}`;
  if (loanTermLabel) loanTermLabel.textContent = termMonths < 24 ? `${termMonths} мес.` : `${termMonths / 12} лет`;
  monthlyPayment.textContent = formatPrice(Math.round(payment));
  monthlyPayment.classList.remove('is-updating');
  void monthlyPayment.offsetWidth;
  monthlyPayment.classList.add('is-updating');
}

function openCarDetails(card) {
  selectedCar = card;
  rememberViewedCar(card);
  const image = card.querySelector('.car-image img');
  const make = card.querySelector('.car-make');
  const title = card.querySelector('.car-title-row h3');
  const price = card.querySelector('.car-price');
  const specs = card.querySelector('.car-specs');

  if (dialogImage && image) {
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
  }
  if (dialogMake && make) dialogMake.textContent = make.textContent || '';
  if (dialogTitle && title) dialogTitle.textContent = title.textContent || '';
  if (dialogPrice && price) dialogPrice.textContent = price.textContent || '';
  if (dialogSpecs && specs) dialogSpecs.textContent = specs.textContent.replace(/\s*·\s*/g, '  •  ');
  updatePaymentEstimate();
  updateDialogFavorite();

  if (carDialog && typeof carDialog.showModal === 'function') {
    carDialog.showModal();
  } else {
    console.error('Диалог с описанием автомобиля не поддерживается этим браузером.');
    if (carInterest && title) carInterest.value = `${make ? make.textContent : ''} ${title.textContent}`.trim();
    window.location.hash = 'contacts';
  }
}

if (downPaymentInput) downPaymentInput.addEventListener('input', updatePaymentEstimate);
if (loanTermInput) loanTermInput.addEventListener('input', updatePaymentEstimate);

function updateDialogFavorite() {
  if (!selectedCar || !dialogFavorite) return;
  const isFavorite = favorites.has(selectedCar.dataset.search || '');
  dialogFavorite.setAttribute('aria-pressed', String(isFavorite));
  dialogFavorite.textContent = isFavorite ? '♥ В избранном' : '♡ В избранное';
}

if (dialogShare) {
  dialogShare.addEventListener('click', async () => {
    if (!selectedCar) return;
    const shareData = {
      title: `DrivePoint — ${getCarName(selectedCar)}`,
      text: `${getCarName(selectedCar)} — ${formatPrice(selectedCar.dataset.price)}. Автомобиль в наличии в DrivePoint.`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('Не удалось поделиться автомобилем.', error);
        showToast('Не удалось открыть меню отправки. Попробуйте скопировать название автомобиля.');
      }
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${window.location.href.split('#')[0]}#cars`);
        showToast('Информация об автомобиле скопирована.');
      } catch (error) {
        console.error('Не удалось скопировать информацию об автомобиле.', error);
        showToast('Не удалось скопировать. Выделите название автомобиля вручную.');
      }
      return;
    }

    showToast(`${getCarName(selectedCar)} · ${formatPrice(selectedCar.dataset.price)}`);
  });
}

if (favoritesToggle) {
  favoritesToggle.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    updateFavoriteButtons();
    filterCars();
  });
}

if (dialogClose && carDialog) {
  dialogClose.addEventListener('click', () => carDialog.close());
  carDialog.addEventListener('click', (event) => {
    if (event.target === carDialog) carDialog.close();
  });
}

if (dialogFavorite) {
  dialogFavorite.addEventListener('click', () => {
    if (!selectedCar) return;
    const favoriteId = selectedCar.dataset.search || '';
    if (favorites.has(favoriteId)) favorites.delete(favoriteId);
    else favorites.add(favoriteId);
    saveFavorites();
    updateFavoriteButtons();
    updateDialogFavorite();
    filterCars();
  });
}

if (dialogContact && carDialog) {
  dialogContact.addEventListener('click', () => {
    if (selectedCar && carInterest) {
      const make = selectedCar.querySelector('.car-make');
      const title = selectedCar.querySelector('.car-title-row h3');
      carInterest.value = `${make ? make.textContent : ''} ${title ? title.textContent : ''}`.trim();
      carInterest.dispatchEvent(new Event('input', { bubbles: true }));
    }
    carDialog.close();
    window.location.hash = 'contacts';
    if (contactForm) {
      const nameInput = contactForm.querySelector('input[name="name"]');
      if (nameInput) nameInput.focus({ preventScroll: true });
    }
  });
}

if (phoneInput) {
  phoneInput.addEventListener('blur', () => {
    let digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
      digits = digits.slice(1);
    }
    if (digits.length !== 10) return;
    phoneInput.value = `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
    phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

if (backToTop) {
  let scrollFrame = 0;
  const updateBackToTop = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
      if (readingProgress) {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
        readingProgress.style.transform = `scaleX(${progress})`;
      }
      scrollFrame = 0;
    });
  };

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (footerCopyPhone) {
  footerCopyPhone.addEventListener('click', () => {
    copyText('8 800 555-35-35', 'Телефон скопирован: 8 800 555-35-35');
  });
}

if (footerShare) {
  footerShare.addEventListener('click', async () => {
    const shareData = {
      title: 'DrivePoint — автомобили с прозрачной историей',
      text: 'Подберите автомобиль с проверенной историей.',
      url: window.location.href.split('#')[0]
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('Не удалось поделиться сайтом.', error);
        showToast('Не удалось открыть меню отправки. Попробуйте скопировать ссылку.');
      }
      return;
    }

    await copyText(shareData.url, 'Ссылка на сайт скопирована.');
  });
}

if (footerPrint) {
  window.addEventListener('beforeprint', () => document.body.classList.add('print-inventory'));
  window.addEventListener('afterprint', () => document.body.classList.remove('print-inventory'));
  footerPrint.addEventListener('click', () => window.print());
}

if (footerExportFavorites) {
  footerExportFavorites.addEventListener('click', () => {
    const favoriteCards = carCards.filter((card) => favorites.has(card.dataset.search || ''));
    if (favoriteCards.length === 0) {
      showToast('Сначала добавьте автомобили в избранное.');
      return;
    }

    const exportText = [
      'Мои избранные автомобили — DrivePoint',
      '',
      ...favoriteCards.flatMap((card, index) => {
        const specs = card.querySelector('.car-specs');
        return [
          `${index + 1}. ${getCarName(card)}`,
          `Цена: ${formatPrice(card.dataset.price)}`,
          `Характеристики: ${specs ? specs.textContent.replace(/\s*·\s*/g, ' · ') : 'уточняйте у менеджера'}`,
          ''
        ];
      })
    ].join('\r\n');

    try {
      const file = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
      const fileUrl = URL.createObjectURL(file);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileUrl;
      downloadLink.download = 'drivepoint-favorites.txt';
      document.body.append(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
      showToast(`Список из ${favoriteCards.length} автомобилей скачан.`);
    } catch (error) {
      console.error('Не удалось создать файл избранных автомобилей.', error);
      showToast('Не удалось подготовить файл. Попробуйте ещё раз.');
    }
  });
}

if ('IntersectionObserver' in window) {
  const sectionLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const sectionObserver = new IntersectionObserver((entries) => {
    const activeEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!activeEntry) return;

    sectionLinks.forEach((link) => {
      const isCurrent = link.hash === `#${activeEntry.target.id}`;
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-22% 0px -68% 0px', threshold: 0 });

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
}

document.addEventListener('keydown', (event) => {
  const target = event.target;
  if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (event.key === '/' || (event.ctrlKey && event.key.toLowerCase() === 'k')) {
    if (!carSearch) return;
    event.preventDefault();
    carSearch.focus();
    carSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Быстрый поиск: введите марку или модель.');
  } else if (event.key.toLowerCase() === 'f' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    if (!favoritesToggle) return;
    favoritesToggle.click();
    favoritesToggle.focus({ preventScroll: true });
  } else if (event.key === '+' || event.key === '=') {
    if (!textLarger || textLarger.disabled) return;
    event.preventDefault();
    textLarger.click();
  } else if (event.key === '-' || event.key === '_') {
    if (!textSmaller || textSmaller.disabled) return;
    event.preventDefault();
    textSmaller.click();
  } else if (event.key === '0' && !event.ctrlKey && !event.metaKey && !event.altKey) {
    if (!textReset) return;
    event.preventDefault();
    textReset.click();
  }
});

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (finePointer.matches && !reducedMotion.matches) {
  let pointerFrame = 0;
  let pendingPointerEvent = null;
  const spotlightSelector = '.car-card, .steps-grid article, .trust-list article, .faq-item, .contact-panel';

  document.addEventListener('pointermove', (event) => {
    pendingPointerEvent = event;
    if (pointerFrame) return;
    pointerFrame = window.requestAnimationFrame(() => {
      pointerFrame = 0;
      const pointerEvent = pendingPointerEvent;
      if (!pointerEvent) return;
      const target = pointerEvent.target;
      if (!(target instanceof Element)) return;

      const spotlight = target.closest(spotlightSelector);
      if (spotlight) {
        const bounds = spotlight.getBoundingClientRect();
        const x = pointerEvent.clientX - bounds.left;
        const y = pointerEvent.clientY - bounds.top;
        spotlight.style.setProperty('--spot-x', `${x}px`);
        spotlight.style.setProperty('--spot-y', `${y}px`);
        spotlight.classList.add('pointer-spotlight');

        if (spotlight.classList.contains('car-card')) {
          const image = spotlight.querySelector('.car-image img');
          if (image) {
            const shiftX = ((x / bounds.width) - 0.5) * -8;
            const shiftY = ((y / bounds.height) - 0.5) * -6;
            image.style.setProperty('--image-shift-x', `${shiftX.toFixed(1)}px`);
            image.style.setProperty('--image-shift-y', `${shiftY.toFixed(1)}px`);
          }
        }
      }

      const hero = target.closest('.hero');
      if (hero) {
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty('--hero-glow-x', `${((pointerEvent.clientX - bounds.left) / bounds.width) * 100}%`);
        hero.style.setProperty('--hero-glow-y', `${((pointerEvent.clientY - bounds.top) / bounds.height) * 100}%`);
        hero.classList.add('pointer-glow');
      }
    });
  }, { passive: true });

  document.addEventListener('pointerout', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const spotlight = target.closest(spotlightSelector);
    if (spotlight && event.relatedTarget instanceof Node && !spotlight.contains(event.relatedTarget)) {
      spotlight.classList.remove('pointer-spotlight');
      const image = spotlight.querySelector('.car-image img');
      if (image) {
        image.style.removeProperty('--image-shift-x');
        image.style.removeProperty('--image-shift-y');
      }
    }

    const hero = target.closest('.hero');
    if (hero && event.relatedTarget instanceof Node && !hero.contains(event.relatedTarget)) {
      hero.classList.remove('pointer-glow');
    }
  }, { passive: true });
}

if (!reducedMotion.matches) {
  document.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || !(event.target instanceof Element)) return;
    const button = event.target.closest('button');
    if (!button || button.disabled) return;

    const bounds = button.getBoundingClientRect();
    const diameter = Math.max(bounds.width, bounds.height) * 1.5;
    const ripple = document.createElement('span');
    ripple.className = 'interaction-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - bounds.left - diameter / 2}px`;
    ripple.style.top = `${event.clientY - bounds.top - diameter / 2}px`;
    button.classList.add('ripple-host');
    button.append(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
    window.setTimeout(() => ripple.remove(), 750);
  }, { passive: true });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const formMessage = document.querySelector('#form-message');
if (contactForm && formMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (appointmentDate && appointmentTime && Boolean(appointmentDate.value) !== Boolean(appointmentTime.value)) {
      formMessage.textContent = 'Чтобы записаться на просмотр, выберите и дату, и время. Если время не важно, оставьте оба поля пустыми.';
      formMessage.hidden = false;
      (appointmentDate.value ? appointmentTime : appointmentDate).focus();
      return;
    }

    const requestedVisit = appointmentDate && appointmentTime && appointmentDate.value && appointmentTime.value
      ? ` Предпочтительное время просмотра: ${appointmentDate.value} в ${appointmentTime.value}.`
      : '';
    formMessage.textContent = 'Форма пока работает как макет и не отправляет заявку. Для связи позвоните по номеру 8 800 555-35-35.';
    formMessage.textContent += requestedVisit;
    formMessage.hidden = false;
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('fact')) animateFact(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fact, .section-heading, .inventory-toolbar, .inventory-footer, .trust-copy, .trust-list article, .steps-grid article, .faq-heading, .faq-item, .contact-panel, .car-card').forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    if (element.matches('.car-card, .fact, .trust-list article, .steps-grid article')) {
      element.style.setProperty('--reveal-delay', `${(index % 4) * 65}ms`);
    }
    revealObserver.observe(element);
  });
}

function animateFact(fact) {
  const value = fact.querySelector('strong');
  const numberNode = value ? Array.from(value.childNodes).find((node) => node.nodeType === Node.TEXT_NODE) : null;
  if (!numberNode || fact.dataset.counted === 'true' || reducedMotion.matches) return;

  const originalText = numberNode.textContent || '';
  const target = Number.parseFloat(originalText.replace(',', '.'));
  if (!Number.isFinite(target)) return;

  fact.dataset.counted = 'true';
  const decimalPlaces = originalText.includes('.') ? originalText.split('.')[1].length : 0;
  const duration = 1100;
  const startedAt = performance.now();
  fact.classList.add('is-counting');

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = target * easedProgress;
    numberNode.textContent = currentValue.toLocaleString('ru-RU', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    });

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      numberNode.textContent = originalText;
      fact.classList.remove('is-counting');
    }
  };

  window.requestAnimationFrame(tick);
}
