import { test } from 'qunit';
import Adapter from './adapter';

test('test Adapter', async function(assert) {
  let adapter, result;

  adapter = new Adapter({ namespace: 'api/v1', modelName: 'user' });
  assert.equal(adapter.resourcePath, 'http://localhost:4200/api/v1/users');
  assert.equal(adapter.buildUrl({ filter: { bedrooms: 3 }, sort: '-price' }), 'http://localhost:4200/api/v1/users?filter%5Bbedrooms%5D=3&sort=-price');

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'TeamMember' });
  result = await adapter.query({ filter: { category: 'technology' }});
  assert.equal(result.response.status, 200);
  assert.deepEqual(result.payload.data.length, 12);

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Invalid' });
  result = await adapter.query({ filter: { category: 'technology' }});
  assert.deepEqual(result.response.status, 404);
  assert.deepEqual(result.payload, null);

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'invalid', modelName: 'Unknown' });
  result = await adapter.query({ filter: { category: 'technology' }});
  assert.deepEqual(result.response.status, 200);
  assert.deepEqual(result.error.type, 'invalid-json');
  assert.deepEqual(result.payload, null);

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Listing' });
  result = await adapter.queryRecord('6909598');
  assert.equal(result.response.status, 200);
  assert.equal(result.payload.data.id, '6909598');
});
