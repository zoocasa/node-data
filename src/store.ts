import Adapter from "./adapter";
import Serializer from "./serializer";

export default class Store {
  adapter: Adapter;
  serializer: Serializer;

  constructor(adapter: Adapter, serializer: Serializer) {
    this.adapter = adapter;
    this.serializer = serializer;
  }

  async query(params: object) {
    const res = await this.adapter.fetch(params);
    if (res.ok) {
      const payload: object[] = await res.json();
      return this.serializer.normalizePayload(payload);
    }
  }
}
