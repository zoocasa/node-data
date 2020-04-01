const { dasherizeKeys } = require('egjiri-node-kit/dist/objects/objects');
import Adapter from '../adapter';

export default class JSONAPIAdapter extends Adapter {
  normalizeParams(params: object) {
    return dasherizeKeys(params);
  }
}
