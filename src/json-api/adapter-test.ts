import { test } from 'qunit';
import JSONAPIAdapter from './adapter';

test('test JSONAPIAdapter', function(assert) {
  const adapter = new JSONAPIAdapter({ namespace: 'api' });
  assert.deepEqual((adapter as any).normalizeParams({ filter: { minPrice: 500000 }}), { filter: { 'min-price': 500000 }});
});
