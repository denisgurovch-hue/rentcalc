// === TRANSLATIONS ===
const translations = {
    ru: {
        nav: {
            calculator: "Калькулятор",
            blog: "Блог"
        },
        blog: {
            title: "Блог RentCalc",
            subtitle: "Статьи о доходности аренды, ставке дисконтирования, ипотеке и инвестициях",
            latestTitle: "📝 Из блога"
        },
        footer: {
            text: "RentCalc © 2025 | Калькулятор доходности аренды | Все расчёты выполняются в браузере, данные не передаются"
        }
    },
    en: {
        nav: {
            calculator: "Calculator",
            blog: "Blog"
        },
        blog: {
            title: "RentCalc Blog",
            subtitle: "Articles about rental yield, discount rate, mortgage and investments",
            latestTitle: "📝 From the Blog"
        },
        footer: {
            text: "RentCalc © 2025 | Rental Yield Calculator | All calculations are performed in the browser, data is not transmitted"
        }
    }
};

// === LANGUAGE MANAGEMENT ===
let currentLanguage = 'ru';

function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
        value = value?.[k];
    }
    return value || key;
}

function changeLanguage(lang) {
    currentLanguage = lang;
    try {
        localStorage.setItem('rentcalc_language', lang);
    } catch (e) {
        console.warn('Failed to save language to localStorage:', e);
    }
    document.documentElement.setAttribute('lang', lang);
    updatePageTranslations();
}

function updatePageTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (translation) {
            el.textContent = translation;
        }
    });

    // Update language buttons
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`lang-${currentLanguage}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Initialize language
try {
    const savedLang = localStorage.getItem('rentcalc_language') ||
        (navigator.language.startsWith('ru') ? 'ru' : 'en');
    currentLanguage = savedLang;
} catch (e) {
    console.warn('Failed to load language from localStorage:', e);
    currentLanguage = 'ru';
}

// === THEME TOGGLE ===
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.setAttribute('lang', currentLanguage);
    updateThemeIcon(savedTheme);

    // Update language buttons
    const activeBtn = document.getElementById(`lang-${currentLanguage}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    updatePageTranslations();
});
