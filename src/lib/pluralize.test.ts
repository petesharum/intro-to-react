import { pluralize } from './pluralize';

test('with a count of one should return the singular form', () => {
  expect(pluralize(1, 'item', 'items')).toBe('item');
});

test('with a count of zero should return the plural form', () => {
  expect(pluralize(0, 'item', 'items')).toBe('items');
});

test('with a count of two should return the plural form', () => {
  expect(pluralize(2, 'item', 'items')).toBe('items');
});
