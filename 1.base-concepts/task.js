"use strict";

function solveEquation(a, b, c) {
  const d = b ** 2 - 4 * a * c;

  if (d < 0) {
    return [];
  }

  if (d === 0) {
    return [-b / (2 * a)];
  }

  const sqrtD = Math.sqrt(d);
  return [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)];
}

function toNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    return Number(value);
  }
  return NaN;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  const p = toNumber(percent);
  const c = toNumber(contribution);
  const a = toNumber(amount);
  const n = toNumber(countMonths);

  if ([p, c, a, n].some(Number.isNaN)) {
    return false;
  }

  const monthlyRate = p / 100 / 12;
  const body = a - c;

  if (body <= 0) {
    return 0;
  }

  const payment = body * (monthlyRate + monthlyRate / ((1 + monthlyRate) ** n - 1));
  const total = payment * n;

  return Number(total.toFixed(2));
}