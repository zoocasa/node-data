import { dasherizeKeys } from 'egjiri-node-kit/dist/objects/objects';
import Adapter from '../adapter';

export default class JSONAPIAdapter extends Adapter {
  protected normalizeParams(params: Record<string, unknown>) {
    return dasherizeKeys(params);
  }
}
