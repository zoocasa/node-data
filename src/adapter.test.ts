import Adapter from './adapter';

test('test Adapter', async () => {
  let adapter, result;

  adapter = new Adapter({ namespace: 'api/v1', modelName: 'user' });
  expect(adapter.resourcePath).toEqual('http://localhost:4200/api/v1/users');
  expect(adapter.buildUrl({ filter: { bedrooms: 3 }, sort: '-price' })).toEqual('http://localhost:4200/api/v1/users?filter%5Bbedrooms%5D=3&sort=-price');

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'TeamMember' });
  result = await adapter.query({ filter: { category: 'technology' }});
  expect(result.response.status).toEqual(200);
  expect(result.payload.data.length).toEqual(12);

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Invalid' });
  result = await adapter.query({ filter: { category: 'technology' }});
  expect(result.response.status).toEqual(404);
  expect(result.payload).toEqual(null);

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'invalid', modelName: 'Unknown' });
  result = await adapter.query({ filter: { category: 'technology' }});
  expect(result.response.status).toEqual(200);
  expect(result.error.type).toEqual('invalid-json');
  expect(result.payload).toEqual(null);

  adapter = new Adapter({ host: 'https://www.zoocasa.com', namespace: 'services/api/v3', modelName: 'Listing' });
  result = await adapter.queryRecord('6909598');
  expect(result.response.status).toEqual(200);
  expect(result.payload.data.id).toEqual('6909598');
});
