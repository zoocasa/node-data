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
        const normalizedPayload = this.serializer.normalizePayload(payload);
        return proxy(normalizedPayload, { meta: normalizedPayload.meta, response, error });
    }
    async queryRecord(id) {
        const { payload, response, error } = await this.adapter.queryRecord(id);
        if (error) {
            return proxy({}, { response, error });
        }
        const normalizedPayload = this.serializer.normalizePayload(payload);
        return proxy(normalizedPayload, { response, error });
    }
    save(properties) {
        return this.adapter.save(properties);
    }
}
exports.default = Store;
