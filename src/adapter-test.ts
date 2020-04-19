// @ts-nocheck
import { test } from 'qunit';
import Adapter from './adapter';

test('test Adapter', function(assert) {
  const adapter = new Adapter({ namespace: 'api/v1', modelName: 'user' });
  assert.equal(adapter.resourcePath, 'http://localhost:4200/api/v1/users');
  assert.equal(adapter.buildUrl({ filter: { bedrooms: 3 }, sort: '-price' }), 'http://localhost:4200/api/v1/users?filter%5Bbedrooms%5D=3&sort=-price');
});
