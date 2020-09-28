import Serializer from './serializer';
import { testCreateModel } from '../serializer.test';

test('test JSONAPISerializer Index Payload', () => {
  const indexPayload = {
    data: [
      { id: 1, type: 'users', attributes: { 'first-name': 'John' }},
      { id: 2, type: 'users', attributes: { 'first-name': 'Jane' }},
      { id: 3, type: 'users', attributes: { 'first-name': 'Joe' }, relationships: { friend: { data: { id: 1894, type: 'friends' }}}},
    ],
    meta: {
      'page-number': 1,
      'page-size': 25,
      'total-pages': 1,
      'total-count': 2,
    },
  };
  const response = new Serializer(testCreateModel).normalizePayload(indexPayload);
  expect(response).toEqual([{ id: 1, firstName: 'John' }, { id: 2, firstName: 'Jane' }, { id: 3, firstName: 'Joe', friend: { id: 1894 }}]);
  expect(response.meta).toEqual({ pageNumber: 1, pageSize: 25, totalPages: 1, totalCount: 2 });
});

test('test JSONAPISerializer Show Payload', () => {
  const response = new Serializer(testCreateModel).normalizePayload({
    data: {
      id: 1, type: 'users',
      attributes: { 'first-name': 'John' }},
  });
  expect(response).toEqual({ id: 1, firstName: 'John' });

  const responseWithRelationships = new Serializer(testCreateModel).normalizePayload({
    data:  {
      id: 2,
      type: 'users',
      attributes: { 'first-name': 'Emily' },
      relationships: {
        friend: { data: { id: 2001, type: 'friends' }},
        enemy: { data: { id: 1001, type: 'enemies' }},
      },
    },
  });
  expect(responseWithRelationships).toEqual({ id: 2, firstName: 'Emily', friend: { id: 2001 }, enemy: { id: 1001 }});
});
