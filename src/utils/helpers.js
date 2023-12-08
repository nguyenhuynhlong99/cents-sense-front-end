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

export const listOfIcons = [
  'car',
  'scroll',
  'video',
  'television',
  'shopping',
  'cart',
  'basket',
  'airplane',
  'bus',
  'heart',
  'pizza',
  'hamburger',
  'house',
  'barbell',
  'pet',
  'study',
  'scissors',
  'bank',
  'fork',
  'stethoscope',
  'coat',
  'piggy',
  'mobileDevice',
  'laptop',
  'highHeel',
  'tShirt',
  'treePalm',
  'watch',
  'headphones',
  'file',
];
