// ============================================
// RentCalc 2.0 — Calculator UI Logic
// ============================================

let currentMode = 'basic';
let cashflowChart = null; // График

/**
 * Безопасная отправка целей в Яндекс.Метрику
 */
function trackGoal(goalName) {
    if (typeof ym === 'function') {
        ym(105579895, 'reachGoal', goalName);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    initModeToggle();
    initCalculator();
    initMobileMenu();
    loadFromBlogWidget();
});

/**
 * Инициализация переключения режимов
 */
function initModeToggle() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const proSection = document.getElementById('pro-section');

    modeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const mode = this.dataset.mode;
            switchMode(mode);
        });
    });
}

/**
 * Переключение между Basic и Pro режимом
 * @param {string} mode - 'basic' или 'pro'
 */
function switchMode(mode) {
    currentMode = mode;

    // Обновляем активную кнопку
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Показываем/скрываем Pro секцию
    const proSection = document.getElementById('pro-section');
    if (proSection) {
        proSection.classList.toggle('hidden', mode === 'basic');
    }

    if (mode === 'pro') {
        trackGoal('switch_pro');
    }

    // Скрываем результаты при переключении режима
    hideResults();
}

/**
 * Инициализация калькулятора
 */
function initCalculator() {
    const form = document.getElementById('calculator-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            calculateResults();
        });
    }
}

/**
 * Расчёт и отображение результатов
 */
function calculateResults() {
    trackGoal('calculate_click');

    // Получаем базовые значения
    const price = parseFloat(document.getElementById('price').value) || 0;
    const monthlyRent = parseFloat(document.getElementById('monthly-rent').value) || 0;
    const monthlyExpenses = parseFloat(document.getElementById('monthly-expenses').value) || 0;
    const vacancyDays = parseFloat(document.getElementById('vacancy-days').value) || 0;

    // Базовый расчёт
    const basicResults = calculateBasicYield(price, monthlyRent, monthlyExpenses, vacancyDays);

    // Отображаем базовые результаты
    displayBasicResults(basicResults);

    // Если Pro режим, делаем дополнительные расчёты
    if (currentMode === 'pro') {
        const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
        const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 0;
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
        const loanTerm = parseFloat(document.getElementById('loan-term').value) || 0;

        const mortgagePayment = calculateMortgagePayment(loanAmount, interestRate, loanTerm);
        const cocResults = calculateCashOnCash(basicResults.yearlyProfit, downPayment, mortgagePayment);

        // NPV (упрощённый расчёт на 10 лет с 8% дисконтом)
        const npv = calculateNPV(cocResults.yearlyCashFlow, downPayment, 10, 8);

        displayProResults(mortgagePayment, cocResults, npv);
    }

    // Показываем блок результатов
    showResults();
}

/**
 * Отображение базовых результатов
 * @param {object} results - Результаты базового расчёта
 */
function displayBasicResults(results) {
    document.getElementById('result-monthly-profit').textContent = formatCurrency(results.monthlyProfit);
    document.getElementById('result-yearly-profit').textContent = formatCurrency(results.yearlyProfit);
    document.getElementById('result-yield').textContent = formatPercent(results.yieldPercent);
}

/**
 * Отображение Pro результатов
 * @param {number} mortgagePayment - Платёж по ипотеке
 * @param {object} cocResults - Результаты Cash-on-Cash
 * @param {number} npv - NPV
 */
function displayProResults(mortgagePayment, cocResults, npv) {
    document.getElementById('result-mortgage-payment').textContent = formatCurrency(mortgagePayment);
    document.getElementById('result-cash-flow').textContent = formatCurrency(cocResults.yearlyCashFlow);
    document.getElementById('result-coc').textContent = formatPercent(cocResults.cashOnCashReturn);
    document.getElementById('result-npv').textContent = formatCurrency(npv);
    
    renderCashflowChart(cocResults.yearlyCashFlow, 10);
}

/**
 * Отрисовка графика Cash Flow по годам
 */
function renderCashflowChart(yearlyCashFlow, years) {
    const ctx = document.getElementById('cashflow-chart');
    const container = document.getElementById('chart-container');
    if (!ctx || !container) return;
    
    // Подготовка данных
    const labels = [];
    const data = [];
    let cumulative = 0;
    
    for (let i = 1; i <= years; i++) {
        labels.push(`Год ${i}`);
        cumulative += yearlyCashFlow;
        data.push(cumulative);
    }
    
    // Удаляем старый график, если есть
    if (cashflowChart) {
        cashflowChart.destroy();
    }
    
    container.style.display = 'block'; // Показываем контейнер
    
    cashflowChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Накопленный денежный поток (₽)',
                data: data,
                backgroundColor: 'rgba(37, 99, 235, 0.5)', // primary-color с альфа-каналом
                borderColor: '#2563eb', // primary-color
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return new Intl.NumberFormat('ru-RU').format(context.parsed.y) + ' ₽';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(1) + 'М ₽';
                            if (Math.abs(value) >= 1000) return (value / 1000).toFixed(0) + 'К ₽';
                            return value + ' ₽';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Показать блок результатов
 */
function showResults() {
    const resultsBasic = document.getElementById('results-basic');
    const resultsPro = document.getElementById('results-pro');

    if (resultsBasic) {
        resultsBasic.classList.remove('hidden');
    }

    if (resultsPro && currentMode === 'pro') {
        resultsPro.classList.remove('hidden');
    } else if (resultsPro) {
        resultsPro.classList.add('hidden');
    }

    // Плавная прокрутка к результатам
    resultsBasic.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Скрыть блок результатов
 */
function hideResults() {
    const resultsBasic = document.getElementById('results-basic');
    const resultsPro = document.getElementById('results-pro');

    if (resultsBasic) resultsBasic.classList.add('hidden');
    if (resultsPro) resultsPro.classList.add('hidden');
}

/**
 * Инициализация мобильного меню
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // Закрываем меню при клике на ссылку
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }
}

/**
 * Загрузка виджета "Из блога"
 */
function loadFromBlogWidget() {
    const container = document.getElementById('from-blog-grid');
    if (container) {
        renderFromBlogWidget(5, 'from-blog-grid');
    }
}
