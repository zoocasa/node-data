import { test } from 'qunit';
import Serializer from './serializer';

test('test JSONAPISerializer', function(assert) {
  const payload = {
    data: [
      { id: 1, type: 'users', attributes: { 'first-name': 'John' }},
      { id: 2, type: 'users', attributes: { 'first-name': 'Jane' }},
    ],
    meta: {
      'page-number': 1,
      'page-size': 25,
      'total-pages': 1,
      'total-count': 2,
    }
  };
  const response = new Serializer(modelProperties => modelProperties).normalizePayload(payload);
  assert.deepEqual(response, [{ id: 1, firstName: 'John' }, { id: 2, firstName: 'Jane' }]);
  assert.deepEqual(response.meta, { pageNumber: 1, pageSize: 25, totalPages: 1, totalCount: 2 });
});
