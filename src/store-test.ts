import { test } from 'qunit';
import Store from './store';
import JSONAPIAdapter from './json-api/adapter';
import JSONAPISerializer from './json-api/serializer';
import { testCreateModel } from './serializer-test';

test('test Store', async function(assert) {
  let store, result;

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Listing' }), new JSONAPISerializer(testCreateModel));
  result = await store.query({ filter: { status: 'available' }, page: { size: 2 }});
  assert.equal(result.response.status, 200);
  assert.deepEqual(result.length, 2);
  assert.deepEqual(result.meta.pageSize, 2);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Invalid' }), new JSONAPISerializer(testCreateModel));
  result = await store.query({ filter: { category: 'technology' }});
  assert.deepEqual(result.response.status, 404);
  assert.deepEqual(result, []);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'invalid', modelName: 'Unknown' }), new JSONAPISerializer(testCreateModel));
  result = await store.query({ filter: { category: 'technology' }});
  assert.deepEqual(result.response.status, 200);
  assert.deepEqual(result.error.type, 'invalid-json');
  assert.deepEqual(result, []);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Listing' }), new JSONAPISerializer(testCreateModel));
  result = await store.queryRecord('6909598');
  assert.equal(result.response.status, 200);
  assert.equal(result.id, '6909598');
});
