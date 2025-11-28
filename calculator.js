// === TRANSLATIONS ===
const translations = {
    ru: {
        app: {
            title: "RentCalc",
            subtitle: "Калькулятор доходности аренды"
        },
        nav: {
            calculator: "Калькулятор",
            blog: "Блог"
        },
        form: {
            title: "📊 Параметры расчета",
            propertyPrice: "Цена покупки недвижимости",
            propertyPriceTooltip: "Полная стоимость квартиры при покупке",
            monthlyRent: "Ежемесячная аренда",
            monthlyRentTooltip: "Сумма, которую получаешь от арендатора",
            managementCost: "Управление зданием (в месяц)",
            managementCostTooltip: "Взнос на содержание дома, лифт, охрану",
            repairCost: "Ремонт и обслуживание (в месяц)",
            repairCostTooltip: "Профилактический ремонт, замена мебели",
            taxesCost: "Налоги (в месяц)",
            taxesCostTooltip: "НДФЛ и прочие налоги",
            insuranceCost: "Страховка (в месяц)",
            insuranceCostTooltip: "Страховка имущества от рисков",
            utilitiesCost: "Коммунальные услуги (в месяц)",
            utilitiesCostTooltip: "Если ты платишь вместо арендатора",
            calculate: "💰 Рассчитать",
            clear: "🔄 Очистить",
            hint: "💡 Подсказка: нажми Enter или кнопку \"Рассчитать\"",
            mortgageTitle: "🏦 Ипотека",
            useMortgage: "Использовать ипотеку",
            downPayment: "Первоначальный взнос",
            downPaymentTooltip: "Сумма собственных средств",
            interestRate: "Ставка (%)",
            loanTerm: "Срок (лет)",
            npvTitle: "📈 Инвестиционный анализ (NPV)",
            investmentHorizon: "Горизонт (лет)",
            discountRate: "Дисконт (%)",
            discountRateTooltip: "Ставка дисконтирования"
        },
        mode: {
            basic: "Базовый",
            pro: "Pro"
        },
        results: {
            title: "📈 Результаты",
            noData: "Введи параметры и нажми \"Рассчитать\"",
            success: "✅ Расчёт завершён успешно",
            grossROI: "Валовая доходность",
            netROI: "Чистая доходность",
            yearlyGrossIncome: "Годовой доход (валовой)",
            yearlyNetIncome: "Годовой доход (чистый)",
            monthlyNetIncome: "Ежемесячный чистый доход",
            paybackPeriod: "Срок окупаемости",
            monthlyExpenses: "Расходы в месяц",
            management: "Управление",
            repair: "Ремонт",
            taxes: "Налоги",
            insurance: "Страховка",
            totalExpenses: "Итого расходов",
            perMonth: "/ месяц",
            addToComparison: "➕ Добавить в сравнение",
            impossible: "Невозможно",
            years: "лет",
            mortgagePayment: "Платёж по ипотеке",
            netIncomeAfterMortgage: "Чистый доход (после ипотеки)",
            cashFlow: "Денежный поток (год)",
            cashOnCash: "Cash-on-Cash Return",
            npv: "NPV (Чистая приведенная стоимость)"
        },
        history: {
            title: "📚 История расчётов",
            noData: "Расчёты появятся здесь"
        },
        comparison: {
            title: "🔀 Сравнение вариантов",
            noData: "Сохрани минимум 2 расчёта из истории для сравнения",
            clear: "🗑️ Очистить сравнение",
            rent: "Аренда",
            expenses: "Расходы",
            netIncome: "Чистый доход",
            payback: "Окупаемость",
            remove: "Удалить",
            added: "✅ Добавлено в сравнение",
            alreadyAdded: "ℹ️ Этот расчёт уже в сравнении",
            notFound: "⚠️ Расчёт не найден в истории"
        },
        blog: {
            latestTitle: "📝 Из блога",
            title: "📚 Как рассчитать доходность аренды квартиры?",
            formulaTitle: "Формула расчета ROI при аренде:",
            formula: "(Чистый доход в год / Стоимость недвижимости) × 100%",
            exampleTitle: "Пример расчета:",
            example: "Если квартира стоит 1,500,000 ₽ и приносит 100,000 ₽ чистого дохода в год, то: ROI = (100,000 / 1,500,000) × 100% = 6.67%",
            conclusion: "✅ Это считается хорошей доходностью!",
            average: "Средняя по России 4-8%."
        },
        feedback: {
            title: "💬 Обратная связь",
            namePlaceholder: "Ваше имя",
            emailPlaceholder: "Ваш email",
            messagePlaceholder: "Ваше сообщение",
            submit: "Отправить"
        },
        footer: {
            text: "RentCalc © 2025 | Калькулятор доходности аренды | Все расчёты выполняются в браузере, данные не передаются"
        },
        errors: {
            invalidInput: "⚠️ Укажи цену и аренду (оба поля > 0)"
        }
    },
    en: {
        app: {
            title: "RentCalc",
            subtitle: "Rental Yield Calculator"
        },
        nav: {
            calculator: "Calculator",
            blog: "Blog"
        },
        form: {
            title: "📊 Calculation Parameters",
            propertyPrice: "Property Purchase Price",
            propertyPriceTooltip: "Full cost of the apartment when purchasing",
            monthlyRent: "Monthly Rent",
            monthlyRentTooltip: "Amount you receive from the tenant",
            managementCost: "Building Management (per month)",
            managementCostTooltip: "Building maintenance fee, elevator, security",
            repairCost: "Repairs and Maintenance (per month)",
            repairCostTooltip: "Preventive repairs, furniture replacement",
            taxesCost: "Taxes (per month)",
            taxesCostTooltip: "Income tax and other taxes",
            insuranceCost: "Insurance (per month)",
            insuranceCostTooltip: "Property insurance against risks",
            utilitiesCost: "Utilities (per month)",
            utilitiesCostTooltip: "If you pay instead of the tenant",
            calculate: "💰 Calculate",
            clear: "🔄 Clear",
            hint: "💡 Tip: press Enter or click \"Calculate\"",
            mortgageTitle: "🏦 Mortgage",
            useMortgage: "Use Mortgage",
            downPayment: "Down Payment",
            downPaymentTooltip: "Initial cash investment",
            interestRate: "Rate (%)",
            loanTerm: "Term (years)",
            npvTitle: "📈 Investment Analysis (NPV)",
            investmentHorizon: "Horizon (years)",
            discountRate: "Discount (%)",
            discountRateTooltip: "Discount Rate"
        },
        mode: {
            basic: "Basic",
            pro: "Pro"
        },
        results: {
            title: "📈 Results",
            noData: "Enter parameters and click \"Calculate\"",
            success: "✅ Calculation completed successfully",
            grossROI: "Gross Yield",
            netROI: "Net Yield",
            yearlyGrossIncome: "Annual Income (Gross)",
            yearlyNetIncome: "Annual Income (Net)",
            monthlyNetIncome: "Monthly Net Income",
            paybackPeriod: "Payback Period",
            monthlyExpenses: "Monthly Expenses",
            management: "Management",
            repair: "Repairs",
            taxes: "Taxes",
            insurance: "Insurance",
            totalExpenses: "Total Expenses",
            perMonth: "/ month",
            addToComparison: "➕ Add to Comparison",
            impossible: "Impossible",
            years: "years",
            mortgagePayment: "Mortgage Payment",
            netIncomeAfterMortgage: "Net Income (after mortgage)",
            cashFlow: "Cash Flow (yearly)",
            cashOnCash: "Cash-on-Cash Return",
            npv: "NPV (Net Present Value)"
        },
        history: {
            title: "📚 Calculation History",
            noData: "Calculations will appear here"
        },
        comparison: {
            title: "🔀 Compare Options",
            noData: "Save at least 2 calculations from history to compare",
            clear: "🗑️ Clear Comparison",
            rent: "Rent",
            expenses: "Expenses",
            netIncome: "Net Income",
            payback: "Payback",
            remove: "Remove",
            added: "✅ Added to comparison",
            alreadyAdded: "ℹ️ This calculation is already in comparison",
            notFound: "⚠️ Calculation not found in history"
        },
        blog: {
            latestTitle: "📝 From the Blog",
            title: "📚 How to Calculate Rental Yield?",
            formulaTitle: "ROI Calculation Formula for Rent:",
            formula: "(Net Annual Income / Property Value) × 100%",
            exampleTitle: "Calculation Example:",
            example: "If a property costs 1,500,000 ₽ and generates 100,000 ₽ net income per year, then: ROI = (100,000 / 1,500,000) × 100% = 6.67%",
            conclusion: "✅ This is considered good yield!",
            average: "Average in Russia is 4-8%."
        },
        feedback: {
            title: "💬 Feedback",
            namePlaceholder: "Your Name",
            emailPlaceholder: "Your Email",
            messagePlaceholder: "Your Message",
            submit: "Send"
        },
        footer: {
            text: "RentCalc © 2025 | Rental Yield Calculator | All calculations are performed in the browser, data is not transmitted"
        },
        errors: {
            invalidInput: "⚠️ Enter price and rent (both fields > 0)"
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
    updateMetaTags();
}

function updatePageTranslations() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            // For inputs, update placeholder
            if (el.hasAttribute('data-placeholder-i18n')) {
                el.placeholder = getTranslation(el.getAttribute('data-placeholder-i18n'));
            }
        } else {
            el.textContent = translation;
        }
    });

    // Update placeholders separately
    document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
        const key = el.getAttribute('data-placeholder-i18n');
        el.placeholder = getTranslation(key);
    });

    // Update language buttons
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`lang-${currentLanguage}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Re-render dynamic content
    if (calculations.length > 0) {
        displayHistory();
    }
    if (comparisonItems.length > 0) {
        displayComparison();
    }
    // Re-render results if they exist
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer && resultsContainer.querySelector('.result-item')) {
        const lastCalc = calculations[0];
        if (lastCalc) {
            displayResults(lastCalc);
        }
    }
}

function updateMetaTags() {
    const t = translations[currentLanguage];
    document.title = `${t.app.title} - ${t.app.subtitle}`;
    document.querySelector('meta[name="description"]').content = t.app.subtitle + '. ' + (currentLanguage === 'ru'
        ? 'Рассчитайте валовую и чистую доходность квартиры за 30 секунд. Сравнивайте варианты инвестиций.'
        : 'Calculate gross and net rental yield in 30 seconds. Compare investment options.');
    document.querySelector('meta[property="og:title"]').content = `${t.app.title} - ${t.app.subtitle}`;
    document.querySelector('meta[property="og:description"]').content = currentLanguage === 'ru'
        ? 'Рассчитайте ROI аренды квартиры за 30 секунд'
        : 'Calculate rental ROI in 30 seconds';
}

// Initialize language (will be set properly in DOMContentLoaded)
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
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// === CALCULATION LOGIC ===
let calculations = [];
let comparisonItems = [];
let isProMode = false;

function toggleMode() {
    isProMode = document.getElementById('modeToggle').checked;
    const proFields = document.getElementById('pro-fields');
    if (isProMode) {
        proFields.classList.remove('hidden');
    } else {
        proFields.classList.add('hidden');
    }
    // Re-calculate if needed or just update UI
}

function toggleMortgageFields() {
    const useMortgage = document.getElementById('useMortgage').checked;
    const mortgageDetails = document.getElementById('mortgage-details');
    if (useMortgage) {
        mortgageDetails.classList.remove('hidden');
    } else {
        mortgageDetails.classList.add('hidden');
    }
}

function calculateMortgage(principal, rate, termYears) {
    if (principal <= 0 || rate <= 0 || termYears <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = termYears * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateNPV(initialCash, yearlyCashFlow, horizonYears, discountRate, terminalValue) {
    let npv = -initialCash;
    const rate = discountRate / 100;

    for (let t = 1; t <= horizonYears; t++) {
        npv += yearlyCashFlow / Math.pow(1 + rate, t);
    }

    if (terminalValue) {
        npv += terminalValue / Math.pow(1 + rate, horizonYears);
    }

    return npv;
}

// Format number with spaces (e.g., 1500000 -> "1 500 000")
function formatMoney(value) {
    if (!value && value !== 0) return '';
    // Remove all non-digit characters
    const numStr = String(value).replace(/\D/g, '');
    if (!numStr) return '';
    // Add spaces every 3 digits from right
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Parse formatted money string to number (e.g., "1 500 000" -> 1500000)
function parseMoney(value) {
    if (!value) return 0;
    // Remove all non-digit characters and parse
    const numStr = String(value).replace(/\D/g, '');
    return parseFloat(numStr) || 0;
}

// Format input on change
function formatMoneyInput(input) {
    const cursorPos = input.selectionStart;
    const oldValue = input.value;
    const oldLength = oldValue.length;

    const parsed = parseMoney(oldValue);
    const formatted = formatMoney(parsed);

    input.value = formatted;

    // Adjust cursor position
    const newLength = formatted.length;
    const lengthDiff = newLength - oldLength;
    const newCursorPos = Math.max(0, cursorPos + lengthDiff);
    input.setSelectionRange(newCursorPos, newCursorPos);
}

function getFormValues() {
    return {
        propertyPrice: parseMoney(document.getElementById('propertyPrice').value),
        monthlyRent: parseMoney(document.getElementById('monthlyRent').value),
        managementCost: parseMoney(document.getElementById('managementCost').value),
        repairCost: parseMoney(document.getElementById('repairCost').value),
        taxesCost: parseMoney(document.getElementById('taxesCost').value),
        insuranceCost: parseMoney(document.getElementById('insuranceCost').value),
        utilitiesCost: parseMoney(document.getElementById('utilitiesCost').value),
        // Pro fields
        useMortgage: document.getElementById('useMortgage').checked,
        downPayment: parseMoney(document.getElementById('downPayment').value),
        interestRate: parseFloat(document.getElementById('interestRate').value) || 0,
        loanTerm: parseFloat(document.getElementById('loanTerm').value) || 0,
        investmentHorizon: parseFloat(document.getElementById('investmentHorizon').value) || 10,
        discountRate: parseFloat(document.getElementById('discountRate').value) || 10
    };
}

function calculate() {
    const values = getFormValues();

    if (values.propertyPrice <= 0 || values.monthlyRent <= 0) {
        alert(getTranslation('errors.invalidInput'));
        return null;
    }

    const totalMonthlyExpenses =
        values.managementCost +
        values.repairCost +
        values.taxesCost +
        values.insuranceCost +
        values.utilitiesCost;

    const monthlyNetIncome = values.monthlyRent - totalMonthlyExpenses;
    const yearlyGrossIncome = values.monthlyRent * 12;
    const yearlyNetIncome = monthlyNetIncome * 12;
    const yearlyExpenses = totalMonthlyExpenses * 12;

    const grossROI = (yearlyGrossIncome / values.propertyPrice) * 100;
    const netROI = (yearlyNetIncome / values.propertyPrice) * 100;
    const paybackPeriod = yearlyNetIncome > 0 ? values.propertyPrice / yearlyNetIncome : Infinity;

    // Pro Mode Calculations
    let mortgagePayment = 0;
    let netIncomeAfterMortgage = monthlyNetIncome;
    let yearlyCashFlow = yearlyNetIncome;
    let cashOnCash = 0;
    let npv = 0;
    let loanAmount = 0;

    if (isProMode) {
        if (values.useMortgage) {
            loanAmount = values.propertyPrice - values.downPayment;
            mortgagePayment = calculateMortgage(loanAmount, values.interestRate, values.loanTerm);
            netIncomeAfterMortgage = monthlyNetIncome - mortgagePayment;
            yearlyCashFlow = netIncomeAfterMortgage * 12;

            if (values.downPayment > 0) {
                cashOnCash = (yearlyCashFlow / values.downPayment) * 100;
            }
        }

        // NPV
        const initialInvestment = values.useMortgage ? values.downPayment : values.propertyPrice;
        npv = calculateNPV(initialInvestment, yearlyCashFlow, values.investmentHorizon, values.discountRate, values.propertyPrice);
    }

    return {
        ...values,
        totalMonthlyExpenses,
        monthlyNetIncome,
        yearlyGrossIncome,
        yearlyNetIncome,
        yearlyExpenses,
        grossROI,
        netROI,
        paybackPeriod,
        // Pro metrics
        isProMode,
        mortgagePayment,
        netIncomeAfterMortgage,
        yearlyCashFlow,
        cashOnCash,
        npv,
        timestamp: new Date().toLocaleString(currentLanguage === 'ru' ? 'ru-RU' : 'en-US'),
        id: Date.now()
    };
}

function displayResults(calc) {
    if (!calc) return;

    const locale = currentLanguage === 'ru' ? 'ru-RU' : 'en-US';
    const t = translations[currentLanguage].results;

    let proResultsHTML = '';
    if (calc.isProMode) {
        proResultsHTML = `
            <div class="divider"></div>
            <h3 style="margin-bottom: 16px; font-size: 1.1rem;">Pro Metrics</h3>
            <div class="results-grid">
                ${calc.useMortgage ? `
                <div class="result-item">
                    <div class="result-label">${t.mortgagePayment}</div>
                    <div class="result-value" style="color: var(--warning);">${Math.round(calc.mortgagePayment).toLocaleString(locale)} ₽</div>
                </div>
                <div class="result-item">
                    <div class="result-label">${t.netIncomeAfterMortgage}</div>
                    <div class="result-value ${calc.netIncomeAfterMortgage < 0 ? 'error' : 'success'}">${Math.round(calc.netIncomeAfterMortgage).toLocaleString(locale)} ₽</div>
                </div>
                <div class="result-item">
                    <div class="result-label">${t.cashFlow}</div>
                    <div class="result-value ${calc.yearlyCashFlow < 0 ? 'error' : 'success'}">${Math.round(calc.yearlyCashFlow).toLocaleString(locale)} ₽</div>
                </div>
                <div class="result-item">
                    <div class="result-label">${t.cashOnCash}</div>
                    <div class="result-value ${calc.cashOnCash < 0 ? 'error' : 'success'}">${calc.cashOnCash.toFixed(2)}%</div>
                </div>
                ` : ''}
                <div class="result-item" style="grid-column: 1 / -1;">
                    <div class="result-label">${t.npv}</div>
                    <div class="result-value ${calc.npv < 0 ? 'error' : 'success'}">${Math.round(calc.npv).toLocaleString(locale)} ₽</div>
                </div>
            </div>
        `;
    }

    const resultsHTML = `
        <div class="alert alert-success">
            ${t.success}
        </div>

        <div class="results-grid">
            <div class="result-item">
                <div class="result-label">${t.grossROI}</div>
                <div class="result-value">${calc.grossROI.toFixed(2)}%</div>
            </div>
            <div class="result-item">
                <div class="result-label">${t.netROI}</div>
                <div class="result-value ${calc.netROI < 0 ? 'error' : 'info'}">${calc.netROI.toFixed(2)}%</div>
            </div>
            <div class="result-item">
                <div class="result-label">${t.yearlyGrossIncome}</div>
                <div class="result-value" style="color: var(--warning);">${Math.round(calc.yearlyGrossIncome).toLocaleString(locale)} ₽</div>
            </div>
            <div class="result-item">
                <div class="result-label">${t.yearlyNetIncome}</div>
                <div class="result-value ${calc.yearlyNetIncome < 0 ? 'error' : ''}">${Math.round(calc.yearlyNetIncome).toLocaleString(locale)} ₽</div>
            </div>
            <div class="result-item">
                <div class="result-label">${t.monthlyNetIncome}</div>
                <div class="result-value ${calc.monthlyNetIncome < 0 ? 'error' : ''}">${Math.round(calc.monthlyNetIncome).toLocaleString(locale)} ₽</div>
            </div>
            <div class="result-item">
                <div class="result-label">${t.paybackPeriod}</div>
                <div class="result-value ${calc.paybackPeriod === Infinity || calc.paybackPeriod < 0 ? 'error' : calc.paybackPeriod > 30 ? 'warning' : 'info'}">${calc.paybackPeriod === Infinity ? '∞' : calc.paybackPeriod < 0 ? t.impossible : calc.paybackPeriod.toFixed(1) + ' ' + t.years}</div>
            </div>
        </div>

        ${proResultsHTML}

        <div style="margin-top: 20px; padding: 16px; background: rgba(16, 185, 129, 0.05); border-radius: 8px;">
            <p style="font-size: 0.9rem; margin-bottom: 8px;"><strong>📊 ${t.monthlyExpenses}:</strong></p>
            <div style="font-size: 0.85rem; color: var(--text-light); line-height: 1.8;">
                ${t.management}: ${Math.round(calc.managementCost).toLocaleString(locale)} ₽ | 
                ${t.repair}: ${Math.round(calc.repairCost).toLocaleString(locale)} ₽ | 
                ${t.taxes}: ${Math.round(calc.taxesCost).toLocaleString(locale)} ₽ | 
                ${t.insurance}: ${Math.round(calc.insuranceCost).toLocaleString(locale)} ₽
            </div>
            <div style="font-size: 0.85rem; color: var(--text-light); margin-top: 8px;">
                <strong>${t.totalExpenses}:</strong> ${Math.round(calc.totalMonthlyExpenses).toLocaleString(locale)} ₽ ${t.perMonth}
            </div>
        </div>

        <div style="margin-top: 16px;">
            <button class="btn-secondary" onclick="addToComparison(${calc.id})" style="width: 100%;">${t.addToComparison}</button>
        </div>
    `;

    document.getElementById('results-container').innerHTML = resultsHTML;
}

function calculateOnButtonClick() {
    const calc = calculate();
    if (calc) {
        displayResults(calc);
        addToHistory(calc);
    }
}

// === HISTORY MANAGEMENT ===
function addToHistory(calc) {
    calculations.unshift(calc);
    if (calculations.length > 20) calculations.pop();
    try {
        localStorage.setItem('rentcalc_history', JSON.stringify(calculations));
    } catch (e) {
        console.warn('Failed to save history to localStorage:', e);
    }
    displayHistory();
}

function displayHistory() {
    if (calculations.length === 0) {
        const t = getTranslation('history.noData');
        document.getElementById('history-container').innerHTML =
            `<div class="no-data" style="padding: 16px;">${t}</div>`;
        return;
    }

    const locale = currentLanguage === 'ru' ? 'ru-RU' : 'en-US';
    const monthText = currentLanguage === 'ru' ? '/мес' : '/mo';

    const historyHTML = calculations.map(calc => `
        <div class="history-item" onclick="loadFromHistory(${calc.id})">
            <div class="history-item-text">
                🏠 ${Math.round(calc.propertyPrice / 1000000)}M ₽ | 💰 ${Math.round(calc.monthlyRent)}₽${monthText} | ${calc.netROI.toFixed(1)}% ROI
                <br><small style="opacity: 0.7;">${calc.timestamp}</small>
            </div>
            <button class="history-delete" onclick="deleteFromHistory(${calc.id}, event)">✕</button>
        </div>
    `).join('');

    document.getElementById('history-container').innerHTML = historyHTML;
}

function loadFromHistory(id) {
    const calc = calculations.find(c => c.id === id);
    if (calc) {
        document.getElementById('propertyPrice').value = formatMoney(calc.propertyPrice);
        document.getElementById('monthlyRent').value = formatMoney(calc.monthlyRent);
        document.getElementById('managementCost').value = formatMoney(calc.managementCost);
        document.getElementById('repairCost').value = formatMoney(calc.repairCost);
        document.getElementById('taxesCost').value = formatMoney(calc.taxesCost);
        document.getElementById('insuranceCost').value = formatMoney(calc.insuranceCost);
        document.getElementById('utilitiesCost').value = formatMoney(calc.utilitiesCost);
        displayResults(calc);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function deleteFromHistory(id, event) {
    event.stopPropagation();
    calculations = calculations.filter(c => c.id !== id);
    // Also remove from comparison if it's there
    comparisonItems = comparisonItems.filter(c => c.id !== id);
    try {
        localStorage.setItem('rentcalc_history', JSON.stringify(calculations));
        localStorage.setItem('rentcalc_comparison', JSON.stringify(comparisonItems));
    } catch (e) {
        console.warn('Failed to save to localStorage:', e);
    }
    displayHistory();
    displayComparison();
}

function clearForm() {
    document.getElementById('propertyPrice').value = '1 500 000';
    document.getElementById('monthlyRent').value = '30 000';
    document.getElementById('managementCost').value = '3 000';
    document.getElementById('repairCost').value = '2 000';
    document.getElementById('taxesCost').value = '1 500';
    document.getElementById('insuranceCost').value = '500';
    document.getElementById('utilitiesCost').value = '0';
    const t = getTranslation('results.noData');
    document.getElementById('results-container').innerHTML =
        `<div class="no-data">${t}</div>`;
}

// === COMPARISON ===
function addToComparison(id) {
    const calc = calculations.find(c => c.id === id);
    const t = translations[currentLanguage].comparison;
    if (!calc) {
        alert(t.notFound);
        return;
    }
    if (comparisonItems.find(c => c.id === id)) {
        alert(t.alreadyAdded);
        return;
    }
    comparisonItems.push(calc);
    if (comparisonItems.length > 3) comparisonItems.shift();
    try {
        localStorage.setItem('rentcalc_comparison', JSON.stringify(comparisonItems));
    } catch (e) {
        console.warn('Failed to save comparison to localStorage:', e);
    }
    displayComparison();
    alert(t.added);
}

function displayComparison() {
    const t = translations[currentLanguage].comparison;
    const locale = currentLanguage === 'ru' ? 'ru-RU' : 'en-US';
    const monthText = currentLanguage === 'ru' ? '/мес' : '/mo';
    const yearsText = currentLanguage === 'ru' ? 'лет' : 'years';

    if (comparisonItems.length < 2) {
        document.getElementById('comparison-container').innerHTML =
            `<div class="no-data">${t.noData}</div>`;
        return;
    }

    const comparisonHTML = `
        <div class="comparison-grid">
            ${comparisonItems.map(calc => `
                <div class="comparison-card">
                    <div class="comparison-title">
                        🏠 ${Math.round(calc.propertyPrice / 1000000)}M ₽
                    </div>
                    <div style="font-size: 0.9rem; line-height: 1.8;">
                        <p><strong>${t.rent}:</strong> ${Math.round(calc.monthlyRent).toLocaleString(locale)} ₽${monthText}</p>
                        <p><strong>${t.expenses}:</strong> ${Math.round(calc.totalMonthlyExpenses).toLocaleString(locale)} ₽${monthText}</p>
                        <p><strong>${t.netIncome}:</strong> ${Math.round(calc.monthlyNetIncome).toLocaleString(locale)} ₽${monthText}</p>
                        <p style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border);">
                            <strong style="color: var(--primary);">ROI: ${calc.netROI.toFixed(2)}%</strong>
                        </p>
                        <p style="font-size: 0.85rem; color: var(--text-light);">
                            ${t.payback}: ${calc.paybackPeriod === Infinity ? '∞' : calc.paybackPeriod < 0 ? getTranslation('results.impossible') : calc.paybackPeriod.toFixed(1) + ' ' + yearsText}
                        </p>
                    </div>
                    <button class="btn-secondary" style="width: 100%; margin-top: 12px;" onclick="removeFromComparison(${calc.id})">${t.remove}</button>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('comparison-container').innerHTML = comparisonHTML;
}

function removeFromComparison(id) {
    comparisonItems = comparisonItems.filter(c => c.id !== id);
    try {
        localStorage.setItem('rentcalc_comparison', JSON.stringify(comparisonItems));
    } catch (e) {
        console.warn('Failed to save comparison to localStorage:', e);
    }
    displayComparison();
}

function clearComparison() {
    comparisonItems = [];
    try {
        localStorage.removeItem('rentcalc_comparison');
    } catch (e) {
        console.warn('Failed to clear comparison from localStorage:', e);
    }
    displayComparison();
}

// === KEYBOARD EVENTS ===
document.addEventListener('DOMContentLoaded', function () {
    // Setup money formatting for all money inputs
    const moneyInputs = document.querySelectorAll('.money-input');
    moneyInputs.forEach(input => {
        // Format on input
        input.addEventListener('input', function (e) {
            formatMoneyInput(this);
        });

        // Format on blur (when user leaves the field)
        input.addEventListener('blur', function (e) {
            formatMoneyInput(this);
        });

        // Handle Enter key
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculateOnButtonClick();
            }
        });
    });

    // Load saved data
    try {
        const savedHistory = localStorage.getItem('rentcalc_history');
        if (savedHistory) {
            calculations = JSON.parse(savedHistory);
            displayHistory();
        }
    } catch (e) {
        console.warn('Failed to load history from localStorage:', e);
    }

    try {
        const savedComparison = localStorage.getItem('rentcalc_comparison');
        if (savedComparison) {
            comparisonItems = JSON.parse(savedComparison);
            // Filter out items that are no longer in history
            comparisonItems = comparisonItems.filter(item =>
                calculations.some(calc => calc.id === item.id)
            );
            displayComparison();
        }
    } catch (e) {
        console.warn('Failed to load comparison from localStorage:', e);
    }

    // Initialize language and translations after page load
    document.documentElement.setAttribute('lang', currentLanguage);
    // Update language buttons
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById(`lang-${currentLanguage}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    updatePageTranslations();
});
