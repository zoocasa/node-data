import Store from './store';
import JSONAPIAdapter from './json-api/adapter';
import JSONAPISerializer from './json-api/serializer';
import { testCreateModel } from './serializer.test';

test('test Store', async () => {
  let store, result;

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Listing' }), new JSONAPISerializer(testCreateModel));
  result = await store.query({ filter: { status: 'available' }, page: { size: 2 }});
  expect(result.response.status).toEqual(200);
  expect(result.length).toEqual(2);
  expect(result.meta.pageSize).toEqual(2);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Invalid' }), new JSONAPISerializer(testCreateModel));
  result = await store.query({ filter: { category: 'technology' }});
  expect(result.response.status).toEqual(404);
  expect(result).toEqual([]);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'invalid', modelName: 'Unknown' }), new JSONAPISerializer(testCreateModel));
  result = await store.query({ filter: { category: 'technology' }});
  expect(result.response.status).toEqual(200);
  expect(result.error.type).toEqual('invalid-json');
  expect(result).toEqual([]);

  store = new Store(new JSONAPIAdapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Listing' }), new JSONAPISerializer(testCreateModel));
  result = await store.queryRecord('6909598');
  expect(result.response.status).toEqual(200);
  expect(result.id).toEqual('6909598');
});
