// ============================================
// RentCalc 2.0 — Calculator UI Logic
// ============================================

let currentMode = 'basic';
let cashflowChart = null; // График
const RENTERIER_UPLIFT_PERCENT = 10;
const RENTERIER_VARIANT_KEY = 'renterier_ab_variant';
const RENTERIER_MODAL_SHOWN_KEY = 'renterier_modal_shown';
const RENTERIER_BASE_URL = 'https://renterier.ru/';
const MONEY_INPUT_IDS = ['price', 'monthly-rent', 'monthly-expenses', 'down-payment', 'loan-amount'];
let renterierAbVariant = null;
let latestCalculationContext = null;

/**
 * Безопасная отправка целей в Яндекс.Метрику
 */
function trackGoal(goalName) {
    if (typeof ym === 'function') {
        ym(105579895, 'reachGoal', goalName);
    }
}

function getDateForFilename(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function saveCalculationContext(values, basicResults, proResults) {
    latestCalculationContext = {
        mode: currentMode,
        source: 'https://rentcalc.ru',
        calculatedAt: new Date(),
        inputs: {
            price: values.price,
            monthlyRent: values.monthlyRent,
            monthlyExpenses: values.monthlyExpenses,
            vacancyDays: values.vacancyDays,
            downPayment: proResults?.downPayment ?? null,
            loanAmount: proResults?.loanAmount ?? null,
            interestRate: proResults?.interestRate ?? null,
            loanTerm: proResults?.loanTerm ?? null
        },
        basic: {
            monthlyProfit: basicResults.monthlyProfit,
            yearlyProfit: basicResults.yearlyProfit,
            yieldPercent: basicResults.yieldPercent
        },
        pro: proResults
            ? {
                mortgagePayment: proResults.mortgagePayment,
                yearlyCashFlow: proResults.yearlyCashFlow,
                cashOnCashReturn: proResults.cashOnCashReturn,
                npv: proResults.npv
            }
            : null
    };
}

function downloadLatestCalculationPdf() {
    if (!latestCalculationContext) {
        alert('Сначала выполните расчет, затем скачайте PDF.');
        return;
    }

    if (!window.pdfMake || !window.pdfMake.createPdf) {
        alert('PDF библиотека не загружена. Обновите страницу и попробуйте снова.');
        return;
    }

    const ctx = latestCalculationContext;
    const content = [
        { text: 'RentCalc - Результат расчета доходности', style: 'header' },
        { text: `Дата: ${ctx.calculatedAt.toLocaleString('ru-RU')}` },
        { text: `Режим: ${ctx.mode === 'pro' ? 'Pro' : 'Basic'}` },
        { text: `Источник: ${ctx.source}` },
        { text: 'Входные параметры', style: 'section' },
        { text: `Цена объекта: ${formatCurrency(ctx.inputs.price)}` },
        { text: `Месячная аренда: ${formatCurrency(ctx.inputs.monthlyRent)}` },
        { text: `Месячные расходы: ${formatCurrency(ctx.inputs.monthlyExpenses)}` },
        { text: `Дней простоя в год: ${Math.round(ctx.inputs.vacancyDays)}` },
        { text: 'Базовые результаты', style: 'section' },
        { text: `Месячная прибыль: ${formatCurrency(ctx.basic.monthlyProfit)}` },
        { text: `Годовая прибыль: ${formatCurrency(ctx.basic.yearlyProfit)}` },
        { text: `Доходность: ${formatPercent(ctx.basic.yieldPercent)}` },
        { text: 'Результаты Pro', style: 'section' }
    ];

    if (ctx.pro) {
        content.push(
            { text: `Первоначальный взнос: ${formatCurrency(ctx.inputs.downPayment)}` },
            { text: `Сумма кредита: ${formatCurrency(ctx.inputs.loanAmount)}` },
            { text: `Ставка по ипотеке: ${ctx.inputs.interestRate}%` },
            { text: `Срок кредита: ${ctx.inputs.loanTerm} лет` },
            { text: `Платеж по ипотеке: ${formatCurrency(ctx.pro.mortgagePayment)}` },
            { text: `Денежный поток в год: ${formatCurrency(ctx.pro.yearlyCashFlow)}` },
            { text: `Cash-on-Cash: ${formatPercent(ctx.pro.cashOnCashReturn)}` },
            { text: `NPV: ${formatCurrency(ctx.pro.npv)}` }
        );
    } else {
        content.push({ text: 'Режим Pro не использовался.' });
    }

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 40],
        defaultStyle: {
            font: 'Roboto',
            fontSize: 11
        },
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            section: {
                fontSize: 13,
                bold: true,
                margin: [0, 10, 0, 6]
            }
        },
        content
    };

    const fileDate = getDateForFilename(ctx.calculatedAt);
    window.pdfMake.createPdf(docDefinition).download(`rentcalc-result-${fileDate}.pdf`);
}

function sanitizeMoneyValue(value) {
    return String(value || '').replace(/\D/g, '');
}

function formatMoneyGroups(value) {
    const digits = sanitizeMoneyValue(value);
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function parseMoneyValue(value) {
    const digits = sanitizeMoneyValue(value);
    return digits ? Number(digits) : 0;
}

function parseMoneyInputValue(id) {
    const input = document.getElementById(id);
    return parseMoneyValue(input ? input.value : '');
}

function initMoneyInputFormatting() {
    MONEY_INPUT_IDS.forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;

        input.addEventListener('focus', function () {
            this.value = sanitizeMoneyValue(this.value);
        });

        input.addEventListener('input', function () {
            this.value = sanitizeMoneyValue(this.value);
        });

        input.addEventListener('blur', function () {
            this.value = formatMoneyGroups(this.value);
        });

        input.value = formatMoneyGroups(input.value);
    });
}

function getOrAssignRenterierVariant() {
    if (renterierAbVariant) return renterierAbVariant;

    try {
        const savedVariant = sessionStorage.getItem(RENTERIER_VARIANT_KEY);
        if (savedVariant === 'a' || savedVariant === 'b') {
            renterierAbVariant = savedVariant;
            return renterierAbVariant;
        }
    } catch (error) {
        console.warn('Unable to read A/B variant from sessionStorage:', error);
    }

    renterierAbVariant = Math.random() < 0.5 ? 'a' : 'b';
    trackGoal(`renterier_ab_assigned_${renterierAbVariant}`);

    try {
        sessionStorage.setItem(RENTERIER_VARIANT_KEY, renterierAbVariant);
    } catch (error) {
        console.warn('Unable to save A/B variant to sessionStorage:', error);
    }

    return renterierAbVariant;
}

function buildRenterierFunnelPayload(values, basicResults) {
    const upliftMonthlyRub = Math.round(values.monthlyRent * (RENTERIER_UPLIFT_PERCENT / 100));
    return {
        price: Math.round(values.price),
        monthlyRent: Math.round(values.monthlyRent),
        monthlyExpenses: Math.round(values.monthlyExpenses),
        vacancyDays: Math.round(values.vacancyDays),
        mode: currentMode,
        yieldPercent: Number((basicResults.yieldPercent || 0).toFixed(2)),
        upliftPercent: RENTERIER_UPLIFT_PERCENT,
        upliftMonthlyRub
    };
}

function formatRenterierMoney(value) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(value || 0));
}

function buildRenterierUrl(payload, variant) {
    const url = new URL(RENTERIER_BASE_URL);
    url.searchParams.set('utm_source', 'rentcalc');
    url.searchParams.set('utm_medium', 'modal');
    url.searchParams.set('utm_campaign', 'renterier_funnel');
    url.searchParams.set('utm_content', `variant_${variant}`);
    url.searchParams.set('price', String(payload.price));
    url.searchParams.set('monthly_rent', String(payload.monthlyRent));
    url.searchParams.set('monthly_expenses', String(payload.monthlyExpenses));
    url.searchParams.set('vacancy_days', String(payload.vacancyDays));
    url.searchParams.set('mode', payload.mode);
    url.searchParams.set('yield_percent', String(payload.yieldPercent));
    url.searchParams.set('uplift_percent', String(payload.upliftPercent));
    url.searchParams.set('uplift_monthly_rub', String(payload.upliftMonthlyRub));
    return url.toString();
}

function updateRenterierModalContent(payload, variant, basicResults) {
    const monthlyProfitElement = document.getElementById('modal-result-monthly-profit');
    const yearlyProfitElement = document.getElementById('modal-result-yearly-profit');
    const yieldElement = document.getElementById('modal-result-yield');

    if (basicResults) {
        if (monthlyProfitElement) {
            monthlyProfitElement.textContent = formatCurrency(basicResults.monthlyProfit);
        }
        if (yearlyProfitElement) {
            yearlyProfitElement.textContent = formatCurrency(basicResults.yearlyProfit);
        }
        if (yieldElement) {
            yieldElement.textContent = formatPercent(basicResults.yieldPercent);
        }
    }

    const upliftElement = document.getElementById('renterier-modal-uplift');
    const upliftValueElement = document.getElementById('renterier-modal-uplift-value');
    if (upliftElement) {
        upliftElement.textContent = `Можно поднять аренду на ${payload.upliftPercent}%`;
    }
    if (upliftValueElement) {
        upliftValueElement.textContent = `+${formatRenterierMoney(payload.upliftMonthlyRub)} ₽/мес`;
    }

    const link = document.getElementById('renterier-modal-link');
    if (link) {
        link.href = buildRenterierUrl(payload, variant);
    }
}

function shouldShowRenterierModal(variant) {
    if (variant === 'a') return true;

    try {
        return sessionStorage.getItem(RENTERIER_MODAL_SHOWN_KEY) !== '1';
    } catch (error) {
        console.warn('Unable to read modal shown flag from sessionStorage:', error);
        return true;
    }
}

function markRenterierModalShown() {
    try {
        sessionStorage.setItem(RENTERIER_MODAL_SHOWN_KEY, '1');
    } catch (error) {
        console.warn('Unable to save modal shown flag to sessionStorage:', error);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    initMoneyInputFormatting();
    initModeToggle();
    initCalculator();
    initRenterierModal();
    initMobileMenu();
    loadFromBlogWidget();
    initWaitlistForm();
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
    const values = {
        price: parseMoneyInputValue('price'),
        monthlyRent: parseMoneyInputValue('monthly-rent'),
        monthlyExpenses: parseMoneyInputValue('monthly-expenses'),
        vacancyDays: parseFloat(document.getElementById('vacancy-days').value) || 0
    };

    // Базовый расчёт
    const basicResults = calculateBasicYield(values.price, values.monthlyRent, values.monthlyExpenses, values.vacancyDays);

    // Отображаем базовые результаты
    displayBasicResults(basicResults);

    let proResults = null;

    // Если Pro режим, делаем дополнительные расчёты
    if (currentMode === 'pro') {
        const downPayment = parseMoneyInputValue('down-payment');
        const loanAmount = parseMoneyInputValue('loan-amount');
        const interestRate = parseFloat(document.getElementById('interest-rate').value) || 0;
        const loanTerm = parseFloat(document.getElementById('loan-term').value) || 0;

        const mortgagePayment = calculateMortgagePayment(loanAmount, interestRate, loanTerm);
        const cocResults = calculateCashOnCash(basicResults.yearlyProfit, downPayment, mortgagePayment);

        // NPV (упрощённый расчёт на 10 лет с 8% дисконтом)
        const npv = calculateNPV(cocResults.yearlyCashFlow, downPayment, 10, 8);

        displayProResults(mortgagePayment, cocResults, npv);
        proResults = {
            downPayment,
            loanAmount,
            interestRate,
            loanTerm,
            mortgagePayment,
            yearlyCashFlow: cocResults.yearlyCashFlow,
            cashOnCashReturn: cocResults.cashOnCashReturn,
            npv
        };
    }

    // Показываем блок результатов
    showResults();
    saveCalculationContext(values, basicResults, proResults);

    const funnelPayload = buildRenterierFunnelPayload(values, basicResults);
    const variant = getOrAssignRenterierVariant();
    updateRenterierModalContent(funnelPayload, variant, basicResults);
    if (shouldShowRenterierModal(variant)) {
        openRenterierModal(variant);
    }
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
    const waitlistSection = document.getElementById('waitlist-section');

    if (resultsBasic) {
        resultsBasic.classList.remove('hidden');
    }

    if (resultsPro && currentMode === 'pro') {
        resultsPro.classList.remove('hidden');
    } else if (resultsPro) {
        resultsPro.classList.add('hidden');
    }

    if (waitlistSection) {
        waitlistSection.classList.remove('hidden');
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
    const waitlistSection = document.getElementById('waitlist-section');

    if (resultsBasic) resultsBasic.classList.add('hidden');
    if (resultsPro) resultsPro.classList.add('hidden');
    if (waitlistSection) waitlistSection.classList.add('hidden');
}

/**
 * Инициализация модального окна Renterier
 */
function initRenterierModal() {
    const modal = document.getElementById('renterier-modal');
    if (!modal) return;

    modal.querySelectorAll('[data-modal-close]').forEach(element => {
        element.addEventListener('click', closeRenterierModal);
    });

    const link = document.getElementById('renterier-modal-link');
    if (link) {
        link.addEventListener('click', function () {
            const variant = getOrAssignRenterierVariant();
            trackGoal(`renterier_click_${variant}`);
        });
    }

    const pdfButton = document.getElementById('renterier-download-pdf-btn');
    if (pdfButton) {
        pdfButton.addEventListener('click', function () {
            trackGoal('renterier_pdf_download_click');
            downloadLatestCalculationPdf();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeRenterierModal();
        }
    });
}

/**
 * Показать модальное окно Renterier после успешного расчёта
 */
function openRenterierModal(variant) {
    const modal = document.getElementById('renterier-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    markRenterierModalShown();
    trackGoal(`renterier_modal_show_${variant}`);
}

/**
 * Скрыть модальное окно Renterier
 */
function closeRenterierModal() {
    const modal = document.getElementById('renterier-modal');
    if (!modal) return;

    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
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


/**
 * Инициализация формы wait-list
 */
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('waitlist-email');
        const messageDiv = document.getElementById('waitlist-message');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !emailInput.value) return;

        const email = emailInput.value;
        const webhookUrl = 'https://6322235-kh988567.twc1.net/webhook/0e4e09c9-b07e-4ffd-92ae-53408372fe28';

        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        messageDiv.style.display = 'none';
        messageDiv.className = '';

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                source: 'waitlist',
                product: 'ai-investment-consultant',
                page: 'main-calculator'
            })
        })
        .then(response => {
            if (response.ok) {
                messageDiv.textContent = 'Спасибо! Мы сообщим, когда AI-консультант станет доступен.';
                messageDiv.style.color = '#10B981'; 
                messageDiv.style.display = 'block';
                form.reset(); 
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error submitting waitlist form:', error);
            messageDiv.textContent = 'Не удалось отправить заявку. Попробуйте еще раз позже.';
            messageDiv.style.color = '#EF4444'; 
            messageDiv.style.display = 'block';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
}

