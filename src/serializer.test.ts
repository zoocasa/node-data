import Serializer from './serializer';

export const testCreateModel = properties => properties;

test('test Serializer', () => {
  const serializer = new Serializer(testCreateModel);
  expect(serializer.createModel({ 'first-name': 'John' })).toEqual({ 'first-name': 'John' });
  expect(serializer.normalizePayload([{ 'first-name': 'John' }, { 'first-name': 'Jane' }])).toEqual([{ firstName: 'John' }, { firstName: 'Jane' }]);
});
