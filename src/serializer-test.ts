import { test } from 'qunit';
import Serializer from './serializer';

export const testCreateModel = properties => properties;

test('test Serializer', function(assert) {
  const serializer = new Serializer(testCreateModel);
  assert.deepEqual(serializer.createModel({ 'first-name': 'John' }), { 'first-name': 'John' });
  assert.deepEqual(serializer.normalizePayload([{ 'first-name': 'John' }, { 'first-name': 'Jane' }]), [{ firstName: 'John' }, { firstName: 'Jane' }]);
});
