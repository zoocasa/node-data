import JSONAPIAdapter from './adapter';

test('test JSONAPIAdapter', () => {
  const adapter = new JSONAPIAdapter({ namespace: 'api' });
  expect((adapter as any).normalizeParams({ filter: { minPrice: 500000 }})).toEqual({ filter: { 'min-price': 500000 }});
});
