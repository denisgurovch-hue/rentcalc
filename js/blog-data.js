// ============================================
// RentCalc 2.0 — Blog Data
// Article metadata for catalog and widgets
// ============================================

const posts = [
    {
        slug: 'kak-schitat-dohodnost',
        title: 'Как правильно считать доходность аренды',
        excerpt: 'Почему простая формула "аренда/цена" не показывает настоящую картину. Разбираем расходы, простои и реальную доходность.',
        tags: ['доходность', 'расчёты'],
        date: '2025-11-25',
        dateFormatted: '25 ноября 2025'
    },
    {
        slug: 'riski-arendy',
        title: 'Риски сдачи недвижимости в аренду',
        excerpt: 'Вакансия, ремонты, проблемные арендаторы — как учитывать риски при оценке инвестиций в недвижимость.',
        tags: ['риски', 'аренда'],
        date: '2025-11-22',
        dateFormatted: '22 ноября 2025'
    },
    {
        slug: 'ipoteka-vs-investicii',
        title: 'Ипотека для сдачи в аренду или альтернативные инвестиции',
        excerpt: 'Когда ипотечная квартира для аренды имеет смысл, а когда лучше вложиться в акции или облигации. Сравниваем NPV и риски.',
        tags: ['ипотека', 'инвестиции', 'NPV'],
        date: '2025-11-18',
        dateFormatted: '18 ноября 2025'
    }
];

/**
 * Получить последние N постов
 * @param {number} count - Количество постов
 * @returns {Array} Массив последних постов
 */
function getLatestPosts(count = 3) {
    return posts.slice(0, count);
}

/**
 * Получить пост по slug
 * @param {string} slug - Идентификатор поста
 * @returns {object|null} Объект поста или null
 */
function getPostBySlug(slug) {
    return posts.find(post => post.slug === slug) || null;
}

/**
 * Получить посты по тегу
 * @param {string} tag - Тег для фильтрации
 * @returns {Array} Массив постов с данным тегом
 */
function getPostsByTag(tag) {
    return posts.filter(post => post.tags.includes(tag));
}
