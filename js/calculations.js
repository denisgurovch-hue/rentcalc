// ============================================
// RentCalc 2.0 — Calculation Core
// Pure functions without DOM dependencies
// ============================================

/**
 * Расчёт базовой доходности аренды
 * @param {number} price - Цена объекта
 * @param {number} monthlyRent - Месячная арендная плата
 * @param {number} monthlyExpenses - Месячные расходы
 * @param {number} vacancyDays - Дней простоя (вакансии) в год
 * @returns {object} Результаты расчёта
 */
function calculateBasicYield(price, monthlyRent, monthlyExpenses, vacancyDays) {
  // Вychислим фактические месяцы аренды с учётом простоя
  const effectiveMonths = 12 - (vacancyDays / 30);
  
  // Чистый доход в месяц
  const monthlyProfit = monthlyRent - monthlyExpenses;
  
  // Годовой доход с учётом простоя
  const yearlyProfit = monthlyProfit * effectiveMonths;
  
  // Процент доходности
  const yieldPercent = (yearlyProfit / price) * 100;
  
  return {
    monthlyProfit: monthlyProfit,
    yearlyProfit: yearlyProfit,
    yieldPercent: yieldPercent,
    effectiveMonths: effectiveMonths
  };
}

/**
 * Расчёт ежемесячного платежа по ипотеке (аннуитет)
 * @param {number} loanAmount - Сумма кредита
 * @param {number} yearlyRate - Годовая ставка (в процентах)
 * @param {number} years - Срок кредита в годах
 * @returns {number} Ежемесячный платёж
 */
function calculateMortgagePayment(loanAmount, yearlyRate, years) {
  if (loanAmount === 0 || yearlyRate === 0) {
    return 0;
  }
  
  const monthlyRate = yearlyRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  // Формула аннуитетного платежа
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment;
}

/**
 * Расчёт Cash-on-Cash доходности (для Pro режима)
 * @param {number} yearlyProfit - Годовая прибыль от аренды
 * @param {number} downPayment - Первоначальный взнос
 * @param {number} mortgagePayment - Ежемесячный платёж по ипотеке
 * @returns {object} Результаты расчёта с ипотекой
 */
function calculateCashOnCash(yearlyProfit, downPayment, mortgagePayment) {
  // Годовые платежи по ипотеке
  const yearlyMortgagePayment = mortgagePayment * 12;
  
  // Чистый денежный поток после платежей по ипотеке
  const yearlyCashFlow = yearlyProfit - yearlyMortgagePayment;
  
  // Cash-on-Cash Return (доходность на вложенный капитал)
  const cashOnCashReturn = downPayment > 0 
    ? (yearlyCashFlow / downPayment) * 100 
    : 0;
  
  return {
    yearlyCashFlow: yearlyCashFlow,
    cashOnCashReturn: cashOnCashReturn,
    yearlyMortgagePayment: yearlyMortgagePayment
  };
}

/**
 * Расчёт NPV (Net Present Value) — упрощённая версия
 * @param {number} yearlyProfit - Годовая прибыль
 * @param {number} initialInvestment - Начальные инвестиции
 * @param {number} years - Период инвестиции
 * @param {number} discountRate - Ставка дисконтирования (в процентах)
 * @returns {number} NPV
 */
function calculateNPV(yearlyProfit, initialInvestment, years, discountRate) {
  let npv = -initialInvestment;
  const rate = discountRate / 100;
  
  for (let year = 1; year <= years; year++) {
    npv += yearlyProfit / Math.pow(1 + rate, year);
  }
  
  return npv;
}

/**
 * Форматирование числа с разделителями тысяч
 * @param {number} num - Число для форматирования
 * @param {number} decimals - Количество знаков после запятой
 * @returns {string} Отформатированная строка
 */
function formatNumber(num, decimals = 0) {
  return num.toLocaleString('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Форматирование процента
 * @param {number} num - Число процентов
 * @returns {string} Отформатированная строка с %
 */
function formatPercent(num) {
  return num.toFixed(2) + '%';
}

/**
 * Форматирование денежной суммы
 * @param {number} amount - Сумма
 * @returns {string} Отформатированная строка с символом рубля
 */
function formatCurrency(amount) {
  return formatNumber(amount, 0) + ' ₽';
}
