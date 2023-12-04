import { getMonth, getYear } from 'date-fns';

export const currentYear = getYear(new Date());

export const currentMonth = getMonth(new Date());

export function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(amount);
}
