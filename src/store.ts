const proxy = require('egjiri-node-kit/dist/proxy/proxy').default;
import Adapter from "./adapter";
import Serializer from "./serializer";

export default class Store {
  adapter: Adapter;
  serializer: Serializer;

  constructor(adapter: Adapter, serializer: Serializer) {
    this.adapter = adapter;
    this.serializer = serializer;
  }

  async query(params: object = {}) {
    const { payload, response, error } = await this.adapter.query(params);
    if (error) {
      return proxy([], { response, error });
    }
    const normalizedPayload = this.serializer.normalizePayload(payload);
    return proxy(normalizedPayload, { meta: normalizedPayload.meta, response, error });
  }

  save(properties) {
    return this.serializer.createModel(properties).save();
  }
}
