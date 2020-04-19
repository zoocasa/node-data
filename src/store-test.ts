import { test } from 'qunit';
import Store from './store';
import JSONAPIAdapter from './json-api/adapter';
import JSONAPISerializer from './json-api/serializer';

test('test Store', async function(assert) {
  let store, result;

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'TeamMember'}), new JSONAPISerializer(user => user));
  result = await store.query({ filter: { category: 'technology' }});
  assert.equal(result.response.status, 200);
  assert.deepEqual(result.length, 11);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Invalid'}), new JSONAPISerializer(user => user));
  result = await store.query({ filter: { category: 'technology' }});
  assert.deepEqual(result.response.status, 404);
  assert.deepEqual(result, []);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'invalid', modelName: 'Unknown'}), new JSONAPISerializer(user => user));
  result = await store.query({ filter: { category: 'technology' }});
  assert.deepEqual(result.response.status, 200);
  assert.deepEqual(result.error.type, 'invalid-json');
  assert.deepEqual(result, []);
});
