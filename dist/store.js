"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proxy = require('egjiri-node-kit/dist/proxy/proxy').default;
class Store {
    constructor(adapter, serializer) {
        this.adapter = adapter;
        this.serializer = serializer;
    }
    async query(params = {}) {
        const { payload, response, error } = await this.adapter.query(params);
        if (error) {
            return proxy([], { response, error });
        }
        return proxy(this.serializer.normalizePayload(payload), { response, error });
    }
}
exports.default = Store;
