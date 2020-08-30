import proxy from 'egjiri-node-kit/dist/proxy/proxy';
import Adapter from './adapter';
import Serializer from './serializer';

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
    const normalizedPayload = this.serializer.normalizePayload(payload);
    return proxy(normalizedPayload, { meta: normalizedPayload.meta, response, error });
  }

  async queryRecord(id: string | number) {
    const { payload, response, error } = await this.adapter.queryRecord(id);
    if (error) {
      return proxy({}, { response, error });
    }
    const normalizedPayload = this.serializer.normalizePayload(payload);
    return proxy(normalizedPayload, { response, error });
  }

  save(properties: Record<string, unknown>) {
    return this.adapter.save(properties);
  }
}
