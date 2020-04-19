"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_1 = require("./utils/proxy");
class Store {
    constructor(adapter, serializer) {
        this.adapter = adapter;
        this.serializer = serializer;
    }
    async query(params = {}) {
        const { payload, response, error } = await this.adapter.query(params);
        if (error) {
            return proxy_1.default([], { response, error });
        }
        return proxy_1.default(this.serializer.normalizePayload(payload), { response, error });
    }
}
exports.default = Store;
