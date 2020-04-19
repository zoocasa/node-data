import Adapter from "./adapter";
import Serializer from "./serializer";
import proxy from './utils/proxy';

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
    return proxy(this.serializer.normalizePayload(payload), { response, error });
  }
}
