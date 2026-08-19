// Pure conversion functions. No DOM code here.

const GRAMS_PER_POUND = 453.59237; // exact, 1959 International Yard and Pound Agreement
const GRAMS_PER_OUNCE = 28.349523125; // exact, avoirdupois ounce
const GRAMS_PER_TROY_OUNCE = 31.1034768; // exact, troy ounce

// Accepts a number or a string typed by a user. Returns a finite,
// non-negative number, or null if the input can't be used as a weight.
function parseValidNumber(value) {
  if (value === '' || value === null || value === undefined) return null;
  const n = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(n) || !Number.isFinite(n)) return null;
  if (n < 0) return null;
  return n;
}

function roundTo(value, decimals) {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) return null;
  if (typeof decimals !== 'number' || Number.isNaN(decimals) || decimals < 0) return null;
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function gramsToPounds(g) {
  const n = parseValidNumber(g);
  if (n === null) return null;
  return n / GRAMS_PER_POUND;
}

function poundsToGrams(lb) {
  const n = parseValidNumber(lb);
  if (n === null) return null;
  return n * GRAMS_PER_POUND;
}

function gramsToPoundsOunces(g) {
  const n = parseValidNumber(g);
  if (n === null) return null;
  const totalPounds = n / GRAMS_PER_POUND;
  const pounds = Math.floor(totalPounds);
  const ounces = (totalPounds - pounds) * 16;
  return { pounds: pounds, ounces: ounces };
}

function gramsToOunces(g) {
  const n = parseValidNumber(g);
  if (n === null) return null;
  return n / GRAMS_PER_OUNCE;
}

function gramsToTroyOunces(g) {
  const n = parseValidNumber(g);
  if (n === null) return null;
  return n / GRAMS_PER_TROY_OUNCE;
}

function kilogramsToPounds(kg) {
  const n = parseValidNumber(kg);
  if (n === null) return null;
  return (n * 1000) / GRAMS_PER_POUND;
}
