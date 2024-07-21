/**
 * Format a number as a currency
 *
 * @param amount - The amount in cents.
 * @param currency - The currency to format the amount in. Default is 'USD'.
 * @returns The formatted currency.
 *
 * @example
 * formatMoney(1000) // $10.00
 * formatMoney(1000, 'EUR') // €10.00
 */
function formatMoney(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount / 100,
  );
}

export { formatMoney };
