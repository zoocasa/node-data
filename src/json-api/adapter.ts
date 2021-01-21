import { dasherizeKeys } from '@zoocasa/node-kit/objects';
import Adapter from '../adapter';

export default class JSONAPIAdapter extends Adapter {
  protected normalizeParams(params: Record<string, unknown>) {
    return dasherizeKeys(params);
  }
}
