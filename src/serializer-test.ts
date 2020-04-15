import { test } from 'qunit';
import Serializer from './serializer';

test('test constructor', function(assert) {
  const serializer = new Serializer(modelProperties => modelProperties);
  assert.deepEqual(serializer.createModel({ 'first-name': 'John' }), { 'first-name': 'John' });
  assert.deepEqual(serializer.buildModel({ 'first-name': 'John' }), { firstName: 'John' });
  assert.deepEqual(serializer.normalizePayload([{ 'first-name': 'John' }, { 'first-name': 'Jane' }]), [{ firstName: 'John' }, { firstName: 'Jane' }]);
});
