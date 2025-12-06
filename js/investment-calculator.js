// ============================================
// RentCalc 2.0 — Investment Calculator
// Сравнение трех сценариев инвестирования
// ============================================

let currentOutputMode = 'nominal';
let currentCapitalization = true;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    initInvestmentCalculator();
    initMobileMenu();
    syncScenario2LoanAmount();
    syncScenario3DepositAmount();
});

/**
 * Инициализация инвестиционного калькулятора
 */
function initInvestmentCalculator() {
    // Переключатель режима вывода
    const outputModeButtons = document.querySelectorAll('[data-output-mode]');
    outputModeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            outputModeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentOutputMode = this.dataset.outputMode;
        });
    });

    // Переключатель капитализации
    const capitalizationButtons = document.querySelectorAll('[data-capitalization]');
    capitalizationButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            capitalizationButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCapitalization = this.dataset.capitalization === 'true';
        });
    });

    // Кнопка расчета
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateAllScenarios);
    }

    // Автоматический пересчет суммы кредита для сценария 2
    const scenario2Price = document.getElementById('scenario2-price');
    const scenario2DownPayment = document.getElementById('scenario2-down-payment');
    const scenario2LoanAmount = document.getElementById('scenario2-loan-amount');
    
    if (scenario2Price && scenario2DownPayment && scenario2LoanAmount) {
        [scenario2Price, scenario2DownPayment].forEach(input => {
            input.addEventListener('input', syncScenario2LoanAmount);
        });
    }

    // Автоматический пересчет суммы вклада для сценария 3
    const scenario1Price = document.getElementById('scenario1-price');
    const scenario1OnetimeCosts = document.getElementById('scenario1-onetime-costs');
    const scenario3DepositAmount = document.getElementById('scenario3-deposit-amount');
    
    if (scenario1Price && scenario1OnetimeCosts && scenario3DepositAmount) {
        [scenario1Price, scenario1OnetimeCosts].forEach(input => {
            input.addEventListener('input', syncScenario3DepositAmount);
        });
    }
}

/**
 * Синхронизация суммы кредита в сценарии 2
 */
function syncScenario2LoanAmount() {
    const price = parseFloat(document.getElementById('scenario2-price').value) || 0;
    const downPayment = parseFloat(document.getElementById('scenario2-down-payment').value) || 0;
    const loanAmount = document.getElementById('scenario2-loan-amount');
    if (loanAmount) {
        loanAmount.value = Math.max(0, price - downPayment);
    }
}

/**
 * Синхронизация суммы вклада в сценарии 3
 */
function syncScenario3DepositAmount() {
    const price = parseFloat(document.getElementById('scenario1-price').value) || 0;
    const costs = parseFloat(document.getElementById('scenario1-onetime-costs').value) || 0;
    const depositAmount = document.getElementById('scenario3-deposit-amount');
    if (depositAmount) {
        depositAmount.value = price + costs;
    }
}

/**
 * Расчет всех трех сценариев
 */
function calculateAllScenarios() {
    // Получаем общие параметры
    const horizon = parseFloat(document.getElementById('horizon').value) || 10;
    const discountRate = parseFloat(document.getElementById('discount-rate').value) || 8;
    const taxFreeLimit = parseFloat(document.getElementById('tax-free-limit').value) || 210000;
    const depositTaxRate = parseFloat(document.getElementById('deposit-tax-rate').value) || 13;

    // Расчет сценария 1: Квартира за наличные
    const scenario1 = calculateScenario1(horizon, discountRate);

    // Расчет сценария 2: Квартира в ипотеку
    const scenario2 = calculateScenario2(horizon, discountRate);

    // Расчет сценария 3: Банковский вклад
    const scenario3 = calculateScenario3(horizon, discountRate, taxFreeLimit, depositTaxRate);

    // Отображение результатов
    displayResults(scenario1, scenario2, scenario3, currentOutputMode);
}

/**
 * Расчет сценария 1: Квартира за наличные + аренда
 */
function calculateScenario1(horizon, discountRate) {
    const price = parseFloat(document.getElementById('scenario1-price').value) || 0;
    const area = parseFloat(document.getElementById('scenario1-area').value) || 0;
    const onetimeCosts = parseFloat(document.getElementById('scenario1-onetime-costs').value) || 0;
    const cadastral = parseFloat(document.getElementById('scenario1-cadastral').value) || price;
    const propertyTaxRate = parseFloat(document.getElementById('scenario1-property-tax-rate').value) || 0.1;
    const rentalTaxRate = parseFloat(document.getElementById('scenario1-rental-tax-rate').value) || 13;
    const monthlyRent = parseFloat(document.getElementById('scenario1-monthly-rent').value) || 0;
    const vacancy = parseFloat(document.getElementById('scenario1-vacancy').value) || 0;
    const annualExpenses = parseFloat(document.getElementById('scenario1-annual-expenses').value) || 0;
    const rentGrowth = parseFloat(document.getElementById('scenario1-rent-growth').value) || 0;
    const priceGrowth = parseFloat(document.getElementById('scenario1-price-growth').value) || 0;
    const monthsToCommissioning = parseInt(document.getElementById('scenario1-months-to-commissioning').value) || 0;
    const monthsToRenovation = parseInt(document.getElementById('scenario1-months-to-renovation').value) || 0;

    const initialInvestment = price + onetimeCosts;
    const totalDelayMonths = monthsToCommissioning + monthsToRenovation;

    // Проверка на льготу по налогу на имущество (< 20 м²)
    const hasPropertyTaxExemption = area < 20;
    const effectivePropertyTaxRate = hasPropertyTaxExemption ? 0 : propertyTaxRate;

    // Массивы для хранения денежных потоков
    const cashFlows = [];
    let accumulatedRentalIncome = 0;
    let totalPropertyTax = 0;
    let totalRentalTax = 0;

    // Начальный отток
    cashFlows.push({
        month: 0,
        year: 0,
        cashFlow: -initialInvestment,
        type: 'initial'
    });

    // Расчет по месяцам
    let currentRent = monthlyRent;
    let currentPrice = price;

    for (let year = 1; year <= horizon; year++) {
        let yearRentalIncome = 0;
        let yearPropertyTax = 0;
        let yearRentalTax = 0;
        let yearExpenses = 0;

        for (let month = 1; month <= 12; month++) {
            const totalMonth = (year - 1) * 12 + month;

            // Если еще период задержки, аренды нет
            if (totalMonth <= totalDelayMonths) {
                // Только расходы и налог на имущество (если применим)
                if (year === 1 && month === 1 && !hasPropertyTaxExemption) {
                    yearPropertyTax = cadastral * (effectivePropertyTaxRate / 100);
                }
                continue;
            }

            // Расчет арендного дохода с учетом простоя
            const effectiveRent = currentRent * (1 - vacancy / 100);
            yearRentalIncome += effectiveRent;

            // Налог на имущество (раз в год, в первом месяце года)
            if (month === 1 && !hasPropertyTaxExemption) {
                yearPropertyTax = cadastral * (effectivePropertyTaxRate / 100);
            }

            // Расходы (равномерно по месяцам)
            yearExpenses += annualExpenses / 12;
        }

        // Налог на доход от аренды
        const taxableIncome = yearRentalIncome - yearExpenses;
        if (taxableIncome > 0) {
            yearRentalTax = taxableIncome * (rentalTaxRate / 100);
        }

        // Чистый денежный поток за год
        const yearCashFlow = yearRentalIncome - yearExpenses - yearPropertyTax - yearRentalTax;

        accumulatedRentalIncome += yearRentalIncome;
        totalPropertyTax += yearPropertyTax;
        totalRentalTax += yearRentalTax;

        cashFlows.push({
            month: 0,
            year: year,
            cashFlow: yearCashFlow,
            type: 'annual'
        });

        // Рост аренды и цены
        currentRent = currentRent * (1 + rentGrowth / 100);
        currentPrice = currentPrice * (1 + priceGrowth / 100);
    }

    // Финальный поток от продажи
    const finalPrice = price * Math.pow(1 + priceGrowth / 100, horizon);
    const saleCashFlow = finalPrice;
    cashFlows.push({
        month: 0,
        year: horizon,
        cashFlow: saleCashFlow,
        type: 'sale'
    });

    // Расчет NPV
    let npv = -initialInvestment;
    const discountFactor = 1 + discountRate / 100;

    cashFlows.forEach(cf => {
        if (cf.type === 'annual') {
            npv += cf.cashFlow / Math.pow(discountFactor, cf.year);
        } else if (cf.type === 'sale') {
            npv += cf.cashFlow / Math.pow(discountFactor, cf.year);
        }
    });

    // Доход от роста стоимости
    const priceAppreciation = finalPrice - price;

    // Итоговая сумма капитала
    const totalCapital = finalPrice + accumulatedRentalIncome - totalPropertyTax - totalRentalTax - annualExpenses * horizon;

    // Среднегодовая доходность (номинальная)
    const totalReturn = totalCapital - initialInvestment;
    const annualYield = (Math.pow(totalCapital / initialInvestment, 1 / horizon) - 1) * 100;

    // Среднегодовая доходность на капитал (через NPV)
    const npvBasedYield = (Math.pow((npv + initialInvestment) / initialInvestment, 1 / horizon) - 1) * 100;

    return {
        initialInvestment: initialInvestment,
        loanAmount: 0,
        area: area,
        propertyTax: totalPropertyTax,
        accumulatedRentalIncome: accumulatedRentalIncome,
        rentalIncome: accumulatedRentalIncome,
        priceAppreciation: priceAppreciation,
        rentalTax: totalRentalTax,
        depositTax: 0,
        totalCapital: totalCapital,
        npv: npv,
        annualYield: annualYield,
        npvBasedYield: npvBasedYield,
        cashFlows: cashFlows
    };
}

/**
 * Расчет сценария 2: Квартира в ипотеку + аренда
 */
function calculateScenario2(horizon, discountRate) {
    const price = parseFloat(document.getElementById('scenario2-price').value) || 0;
    const area = parseFloat(document.getElementById('scenario2-area').value) || 0;
    const downPayment = parseFloat(document.getElementById('scenario2-down-payment').value) || 0;
    const loanAmount = parseFloat(document.getElementById('scenario2-loan-amount').value) || 0;
    const interestRate = parseFloat(document.getElementById('scenario2-interest-rate').value) || 0;
    const loanTerm = parseFloat(document.getElementById('scenario2-loan-term').value) || 0;
    const onetimeCosts = parseFloat(document.getElementById('scenario2-onetime-costs').value) || 0;
    const cadastral = parseFloat(document.getElementById('scenario2-cadastral').value) || price;
    const propertyTaxRate = parseFloat(document.getElementById('scenario2-property-tax-rate').value) || 0.1;
    const rentalTaxRate = parseFloat(document.getElementById('scenario2-rental-tax-rate').value) || 13;
    const monthlyRent = parseFloat(document.getElementById('scenario2-monthly-rent').value) || 0;
    const vacancy = parseFloat(document.getElementById('scenario2-vacancy').value) || 0;
    const annualExpenses = parseFloat(document.getElementById('scenario2-annual-expenses').value) || 0;
    const rentGrowth = parseFloat(document.getElementById('scenario2-rent-growth').value) || 0;
    const priceGrowth = parseFloat(document.getElementById('scenario2-price-growth').value) || 0;
    const monthsToCommissioning = parseInt(document.getElementById('scenario2-months-to-commissioning').value) || 0;
    const monthsToRenovation = parseInt(document.getElementById('scenario2-months-to-renovation').value) || 0;

    const initialInvestment = downPayment + onetimeCosts;
    const totalDelayMonths = monthsToCommissioning + monthsToRenovation;

    // Проверка на льготу по налогу на имущество
    const hasPropertyTaxExemption = area < 20;
    const effectivePropertyTaxRate = hasPropertyTaxExemption ? 0 : propertyTaxRate;

    // Расчет аннуитетного платежа
    const monthlyMortgagePayment = calculateMortgagePayment(loanAmount, interestRate, loanTerm);

    // Расчет остатка долга по годам
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    let remainingDebt = loanAmount;

    // Массивы для хранения денежных потоков
    const cashFlows = [];
    let accumulatedRentalIncome = 0;
    let totalPropertyTax = 0;
    let totalRentalTax = 0;
    let totalMortgagePayments = 0;

    // Начальный отток
    cashFlows.push({
        month: 0,
        year: 0,
        cashFlow: -initialInvestment,
        type: 'initial'
    });

    // Расчет по месяцам
    let currentRent = monthlyRent;
    let currentPrice = price;

    for (let year = 1; year <= horizon; year++) {
        let yearRentalIncome = 0;
        let yearPropertyTax = 0;
        let yearRentalTax = 0;
        let yearExpenses = 0;
        let yearMortgagePayments = 0;

        for (let month = 1; month <= 12; month++) {
            const totalMonth = (year - 1) * 12 + month;

            // Ипотечные платежи идут всегда (если кредит еще не погашен)
            if (remainingDebt > 0 && totalMonth <= totalPayments) {
                yearMortgagePayments += monthlyMortgagePayment;
                
                // Расчет остатка долга
                const interestPayment = remainingDebt * monthlyRate;
                const principalPayment = monthlyMortgagePayment - interestPayment;
                remainingDebt = Math.max(0, remainingDebt - principalPayment);
            }

            // Если еще период задержки, аренды нет
            if (totalMonth <= totalDelayMonths) {
                if (year === 1 && month === 1 && !hasPropertyTaxExemption) {
                    yearPropertyTax = cadastral * (effectivePropertyTaxRate / 100);
                }
                continue;
            }

            // Расчет арендного дохода
            const effectiveRent = currentRent * (1 - vacancy / 100);
            yearRentalIncome += effectiveRent;

            // Налог на имущество
            if (month === 1 && !hasPropertyTaxExemption) {
                yearPropertyTax = cadastral * (effectivePropertyTaxRate / 100);
            }

            // Расходы
            yearExpenses += annualExpenses / 12;
        }

        // Налог на доход от аренды (упрощение: с аренды минус расходы)
        const taxableIncome = yearRentalIncome - yearExpenses;
        if (taxableIncome > 0) {
            yearRentalTax = taxableIncome * (rentalTaxRate / 100);
        }

        // Чистый денежный поток за год
        const yearCashFlow = yearRentalIncome - yearExpenses - yearPropertyTax - yearRentalTax - yearMortgagePayments;

        accumulatedRentalIncome += yearRentalIncome;
        totalPropertyTax += yearPropertyTax;
        totalRentalTax += yearRentalTax;
        totalMortgagePayments += yearMortgagePayments;

        cashFlows.push({
            month: 0,
            year: year,
            cashFlow: yearCashFlow,
            type: 'annual'
        });

        // Рост аренды и цены
        currentRent = currentRent * (1 + rentGrowth / 100);
        currentPrice = currentPrice * (1 + priceGrowth / 100);
    }

    // Финальный поток от продажи (минус остаток долга)
    const finalPrice = price * Math.pow(1 + priceGrowth / 100, horizon);
    const saleCashFlow = finalPrice - remainingDebt;
    cashFlows.push({
        month: 0,
        year: horizon,
        cashFlow: saleCashFlow,
        type: 'sale'
    });

    // Расчет NPV
    let npv = -initialInvestment;
    const discountFactor = 1 + discountRate / 100;

    cashFlows.forEach(cf => {
        if (cf.type === 'annual') {
            npv += cf.cashFlow / Math.pow(discountFactor, cf.year);
        } else if (cf.type === 'sale') {
            npv += cf.cashFlow / Math.pow(discountFactor, cf.year);
        }
    });

    // Доход от роста стоимости
    const priceAppreciation = finalPrice - price;

    // Итоговая сумма капитала
    const totalCapital = finalPrice - remainingDebt + accumulatedRentalIncome - totalPropertyTax - totalRentalTax - annualExpenses * horizon - totalMortgagePayments;

    // Среднегодовая доходность на собственный капитал
    const totalReturn = totalCapital - initialInvestment;
    const annualYield = (Math.pow(totalCapital / initialInvestment, 1 / horizon) - 1) * 100;

    // Среднегодовая доходность через NPV
    const npvBasedYield = (Math.pow((npv + initialInvestment) / initialInvestment, 1 / horizon) - 1) * 100;

    return {
        initialInvestment: initialInvestment,
        loanAmount: loanAmount,
        area: area,
        propertyTax: totalPropertyTax,
        accumulatedRentalIncome: accumulatedRentalIncome,
        rentalIncome: accumulatedRentalIncome,
        priceAppreciation: priceAppreciation,
        rentalTax: totalRentalTax,
        depositTax: 0,
        totalCapital: totalCapital,
        npv: npv,
        annualYield: annualYield,
        npvBasedYield: npvBasedYield,
        cashFlows: cashFlows
    };
}

/**
 * Расчет сценария 3: Банковский вклад
 */
function calculateScenario3(horizon, discountRate, taxFreeLimit, depositTaxRate) {
    const depositAmount = parseFloat(document.getElementById('scenario3-deposit-amount').value) || 0;
    const depositTerm = parseFloat(document.getElementById('scenario3-deposit-term').value) || horizon;
    const depositRate = parseFloat(document.getElementById('scenario3-deposit-rate').value) || 0;

    const initialInvestment = depositAmount;
    const effectiveTerm = Math.min(horizon, depositTerm);

    let currentDeposit = depositAmount;
    let accumulatedInterest = 0;
    let totalDepositTax = 0;
    const cashFlows = [];

    // Начальный отток
    cashFlows.push({
        month: 0,
        year: 0,
        cashFlow: -initialInvestment,
        type: 'initial'
    });

    for (let year = 1; year <= effectiveTerm; year++) {
        let yearInterest = 0;

        if (currentCapitalization === true || currentCapitalization === 'true') {
            // С капитализацией
            const yearInterestBeforeTax = currentDeposit * (depositRate / 100);
            
            // Расчет налога
            let yearTax = 0;
            if (yearInterestBeforeTax > taxFreeLimit) {
                yearTax = (yearInterestBeforeTax - taxFreeLimit) * (depositTaxRate / 100);
            }

            const yearInterestAfterTax = yearInterestBeforeTax - yearTax;
            yearInterest = yearInterestAfterTax;
            currentDeposit += yearInterestAfterTax;

            accumulatedInterest += yearInterestAfterTax;
            totalDepositTax += yearTax;
        } else {
            // Без капитализации
            const yearInterestBeforeTax = depositAmount * (depositRate / 100);
            
            // Расчет налога
            let yearTax = 0;
            if (yearInterestBeforeTax > taxFreeLimit) {
                yearTax = (yearInterestBeforeTax - taxFreeLimit) * (depositTaxRate / 100);
            }

            const yearInterestAfterTax = yearInterestBeforeTax - yearTax;
            yearInterest = yearInterestAfterTax;

            accumulatedInterest += yearInterestAfterTax;
            totalDepositTax += yearTax;
        }

        cashFlows.push({
            month: 0,
            year: year,
            cashFlow: yearInterest,
            type: 'annual'
        });
    }

    // Финальная сумма
    const isCapitalized = currentCapitalization === true || currentCapitalization === 'true';
    const finalAmount = isCapitalized ? currentDeposit : depositAmount + accumulatedInterest;
    
    // Расчет NPV
    let npv = -initialInvestment;
    const discountFactor = 1 + discountRate / 100;

    // Учитываем годовые потоки процентов
    cashFlows.forEach(cf => {
        if (cf.type === 'annual') {
            npv += cf.cashFlow / Math.pow(discountFactor, cf.year);
        }
    });

    // Добавляем возврат основной суммы в конце срока
    // Для обоих режимов возвращаем финальную сумму в конце срока вклада
    const returnYear = Math.min(effectiveTerm, horizon);
    if (returnYear > 0) {
        npv += finalAmount / Math.pow(discountFactor, returnYear);
    }

    // Итоговая сумма капитала
    const totalCapital = finalAmount;

    // Среднегодовая доходность
    const annualYield = (Math.pow(totalCapital / initialInvestment, 1 / effectiveTerm) - 1) * 100;

    // Среднегодовая доходность через NPV
    const npvBasedYield = (Math.pow((npv + initialInvestment) / initialInvestment, 1 / effectiveTerm) - 1) * 100;

    return {
        initialInvestment: initialInvestment,
        loanAmount: 0,
        area: 0,
        propertyTax: 0,
        accumulatedRentalIncome: accumulatedInterest,
        rentalIncome: 0,
        priceAppreciation: 0,
        rentalTax: 0,
        depositTax: totalDepositTax,
        totalCapital: totalCapital,
        npv: npv,
        annualYield: annualYield,
        npvBasedYield: npvBasedYield,
        cashFlows: cashFlows
    };
}

/**
 * Отображение результатов в таблице
 */
function displayResults(scenario1, scenario2, scenario3, outputMode) {
    const resultsSection = document.getElementById('results-section');
    const tableBody = document.getElementById('results-table-body');

    if (!resultsSection || !tableBody) return;

    // Показываем секцию результатов
    resultsSection.classList.remove('hidden');

    // Формируем строки таблицы
    const rows = [
        {
            label: 'Первоначальные вложения, ₽',
            values: [
                formatCurrency(scenario1.initialInvestment),
                formatCurrency(scenario2.initialInvestment),
                formatCurrency(scenario3.initialInvestment)
            ]
        },
        {
            label: 'Сумма кредита, ₽',
            values: [
                '—',
                formatCurrency(scenario2.loanAmount),
                '—'
            ]
        },
        {
            label: 'Площадь, м² / имущественный налог',
            values: [
                `${scenario1.area} м² / ${scenario1.area < 20 ? '0 ₽ (льгота)' : formatCurrency(scenario1.propertyTax)}`,
                `${scenario2.area} м² / ${scenario2.area < 20 ? '0 ₽ (льгота)' : formatCurrency(scenario2.propertyTax)}`,
                '—'
            ]
        },
        {
            label: 'Накопленный доход (номинально), ₽',
            values: [
                formatCurrency(scenario1.accumulatedRentalIncome + scenario1.priceAppreciation),
                formatCurrency(scenario2.accumulatedRentalIncome + scenario2.priceAppreciation),
                formatCurrency(scenario3.accumulatedRentalIncome)
            ]
        },
        {
            label: 'Доход от аренды, ₽',
            values: [
                formatCurrency(scenario1.rentalIncome),
                formatCurrency(scenario2.rentalIncome),
                '—'
            ]
        },
        {
            label: 'Доход от роста цены объекта, ₽',
            values: [
                formatCurrency(scenario1.priceAppreciation),
                formatCurrency(scenario2.priceAppreciation),
                '—'
            ]
        },
        {
            label: 'Налог по аренде, ₽',
            values: [
                formatCurrency(scenario1.rentalTax),
                formatCurrency(scenario2.rentalTax),
                '—'
            ]
        },
        {
            label: 'Налог на имущество, ₽',
            values: [
                formatCurrency(scenario1.propertyTax),
                formatCurrency(scenario2.propertyTax),
                '—'
            ]
        },
        {
            label: 'Налог на проценты по вкладу, ₽',
            values: [
                '—',
                '—',
                formatCurrency(scenario3.depositTax)
            ]
        },
        {
            label: 'Итоговая сумма капитала, ₽',
            values: [
                formatCurrency(scenario1.totalCapital),
                formatCurrency(scenario2.totalCapital),
                formatCurrency(scenario3.totalCapital)
            ]
        },
        {
            label: outputMode === 'npv' ? 'NPV, ₽ (в рублях сегодня)' : 'NPV, ₽',
            values: [
                formatCurrency(scenario1.npv),
                formatCurrency(scenario2.npv),
                formatCurrency(scenario3.npv)
            ]
        },
        {
            label: 'Среднегодовая доходность, %',
            values: [
                formatPercent(scenario1.annualYield),
                formatPercent(scenario2.annualYield),
                formatPercent(scenario3.annualYield)
            ]
        },
        {
            label: 'Среднегодовая доходность на капитал, %',
            values: [
                formatPercent(scenario1.npvBasedYield),
                formatPercent(scenario2.npvBasedYield),
                formatPercent(scenario3.npvBasedYield)
            ]
        }
    ];

    // Очищаем таблицу
    tableBody.innerHTML = '';

    // Добавляем строки
    rows.forEach(row => {
        const tr = document.createElement('tr');
        
        const tdLabel = document.createElement('td');
        tdLabel.textContent = row.label;
        tdLabel.style.fontWeight = '600';
        tr.appendChild(tdLabel);

        row.values.forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });

    // Плавная прокрутка к результатам
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

