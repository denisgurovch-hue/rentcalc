// ============================================
// RentCalc 2.0 — Blog Rendering
// Functions for rendering blog cards and widgets
// ============================================

/**
 * Рендер карточки блога
 * @param {object} post - Объект поста
 * @returns {string} HTML карточки
 */
function renderBlogCard(post) {
    const tagsHTML = post.tags.map(tag =>
        `<span class="blog-tag">${tag}</span>`
    ).join('');

    const imageHTML = post.image ? 
        `<div class="blog-card-image" style="width: 100%; height: 200px; overflow: hidden; background: var(--bg-secondary);">
            <img src="blog/${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
        </div>` : '';

    return `
    <div class="blog-card">
      ${imageHTML}
      <div class="blog-card-content">
        <div class="blog-card-meta">
          ${tagsHTML}
          <span class="blog-date">${post.dateFormatted}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="blog-card-actions">
          <a href="blog/${post.slug}.html" class="btn btn-primary">Читать</a>
          <a href="/#calculator-form" class="btn btn-secondary">Посчитать</a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Рендер списка постов в блоге
 * @param {Array} postsArray - Массив постов
 * @param {string} containerId - ID контейнера для вставки
 */
function renderBlogList(postsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = postsArray.map(post => renderBlogCard(post)).join('');
    container.innerHTML = html;
}

/**
 * Рендер виджета "Из блога" на главной
 * @param {number} count - Количество постов для отображения
 * @param {string} containerId - ID контейнера для вставки
 */
function renderFromBlogWidget(count, containerId) {
    const latestPosts = getLatestPosts(count);
    renderBlogList(latestPosts, containerId);
}

/**
 * Рендер связанных статей
 * @param {string} currentSlug - Slug текущей статьи
 * @param {string} tag - Тег для фильтрации связанных статей
 * @param {string} containerId - ID контейнера
 * @param {number} maxCount - Максимальное количество статей
 */
function renderRelatedArticles(currentSlug, tag, containerId, maxCount = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Получаем статьи с данным тегом, исключая текущую
    const related = getPostsByTag(tag)
        .filter(post => post.slug !== currentSlug)
        .slice(0, maxCount);

    const html = related.map(post => renderBlogCard(post)).join('');
    container.innerHTML = html;
}
