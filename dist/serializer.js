"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("@egjiri/node-kit/objects");
const proxy_1 = __importDefault(require("@egjiri/node-kit/proxy"));
class Serializer {
    constructor(createModel) {
        this.createModel = createModel;
    }
    normalizePayload(payload) {
        if (Array.isArray(payload)) {
            const content = payload.map(item => this.buildModel(item));
            return this.proxyContent(content);
        }
        else {
            return this.buildModel(payload);
        }
    }
    buildModel(properties) {
        properties = this.transformProperties(properties);
        return this.createModel(properties);
    }
    proxyContent(content, meta = {}) {
        return proxy_1.default(content, { meta: this.transformProperties(meta) });
    }
    transformProperties(properties) {
        return objects_1.camelizeKeys(properties);
    }
}
exports.default = Serializer;
