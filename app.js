const categories = [...new Set(window.OCTO_DATA.map((item) => item.category))].sort();
const articlesGrid = document.getElementById("articlesGrid");
const trendingList = document.getElementById("trendingList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const articleCount = document.getElementById("articleCount");
const categoryCount = document.getElementById("categoryCount");
const randomThemeBtn = document.getElementById("randomThemeBtn");

function injectCategories() {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderTrending() {
  const hot = window.OCTO_DATA.slice(0, 30);
  trendingList.innerHTML = `<h3>الترند التقني</h3>`;
  hot.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "trend-item";
    row.textContent = `${index + 1}. ${item.title}`;
    trendingList.appendChild(row);
  });
}

function renderCards(list) {
  articlesGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "article-card";
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.summary}</p>
      <p class="meta">${item.category} • ${item.level} • ${item.readTime} دقائق</p>
    `;
    fragment.appendChild(card);
  });

  articlesGrid.appendChild(fragment);
}

function filterContent() {
  const term = searchInput.value.trim().toLowerCase();
  const cat = categoryFilter.value;

  const filtered = window.OCTO_DATA.filter((item) => {
    const passTerm =
      !term ||
      item.title.toLowerCase().includes(term) ||
      item.summary.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);
    const passCat = !cat || item.category === cat;
    return passTerm && passCat;
  });

  renderCards(filtered);
}

function randomizeBlueTheme() {
  const palettes = [
    ["#04122f", "#55b0ff", "#8ce9ff"],
    ["#031830", "#3da2ff", "#79dcff"],
    ["#001a35", "#68a8ff", "#8dffff"],
    ["#0a103a", "#5d8dff", "#8be1ff"],
  ];

  const [bg, primary, secondary] = palettes[Math.floor(Math.random() * palettes.length)];
  document.documentElement.style.setProperty("--bg", bg);
  document.documentElement.style.setProperty("--primary", primary);
  document.documentElement.style.setProperty("--secondary", secondary);
}

function init() {
  injectCategories();
  renderTrending();
  renderCards(window.OCTO_DATA.slice(0, 180));
  articleCount.textContent = window.OCTO_DATA.length.toLocaleString("ar-EG");
  categoryCount.textContent = categories.length.toLocaleString("ar-EG");

  searchInput.addEventListener("input", filterContent);
  categoryFilter.addEventListener("change", filterContent);
  randomThemeBtn.addEventListener("click", randomizeBlueTheme);
}

init();
