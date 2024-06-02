import { expect, test } from 'vitest';

import { formatMoney } from './format-money';

test('should format the amount with the specified currency', () => {
  const amount = 100000;
  const currency = 'USD';
  const formatted = formatMoney(amount, currency);
  expect(formatted).toBe('$1,000.00');
});

test('should format the amount with the default currency if not specified', () => {
  const amount = 50000;
  const formatted = formatMoney(amount);
  expect(formatted).toBe('$500.00');
});

test('should format negative amounts correctly', () => {
  const amount = -20000;
  const formatted = formatMoney(amount);
  expect(formatted).toBe('-$200.00');
});
