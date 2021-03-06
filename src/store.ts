import proxy from './utils/proxy';

import type Adapter from './adapter';
import type Serializer from './serializer';

export default class Store {
  adapter: Adapter;
  serializer: Serializer;

  constructor(adapter: Adapter, serializer: Serializer) {
    this.adapter = adapter;
    this.serializer = serializer;
  }

  async query(params: Record<string, unknown> = {}) {
    const { payload, response, error } = await this.adapter.query(params);
    if (error) {
      return proxy([], { response, error });
    }
    const normalizedPayload = this.serializer.normalizePayload(payload as Record<string, unknown>[]);
    return proxy<Record<string, unknown>[]>(normalizedPayload, { meta: normalizedPayload.meta, response, error });
  }

  async queryRecord(id: string | number) {
    const { payload, response, error } = await this.adapter.queryRecord(id);
    if (error) {
      return proxy({}, { response, error });
    }
    const normalizedPayload = this.serializer.normalizePayload(payload as Record<string, unknown>[]);
    return proxy<Record<string, unknown>>(normalizedPayload, { response, error });
  }

  save(properties: Record<string, unknown>) {
    return this.adapter.save(properties);
  }
}
