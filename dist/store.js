"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store {
    constructor(adapter, serializer) {
        this.adapter = adapter;
        this.serializer = serializer;
    }
    async query(params) {
        const res = await this.adapter.fetch(params);
        if (res.ok) {
            const payload = await res.json();
            return this.serializer.normalizePayload(payload);
        }
    }
}
exports.default = Store;
