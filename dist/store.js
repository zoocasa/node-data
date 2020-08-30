"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_1 = __importDefault(require("egjiri-node-kit/dist/proxy/proxy"));
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
        const normalizedPayload = this.serializer.normalizePayload(payload);
        return proxy_1.default(normalizedPayload, { meta: normalizedPayload.meta, response, error });
    }
    async queryRecord(id) {
        const { payload, response, error } = await this.adapter.queryRecord(id);
        if (error) {
            return proxy_1.default({}, { response, error });
        }
        const normalizedPayload = this.serializer.normalizePayload(payload);
        return proxy_1.default(normalizedPayload, { response, error });
    }
    save(properties) {
        return this.adapter.save(properties);
    }
}
exports.default = Store;
