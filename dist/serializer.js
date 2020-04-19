"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { camelizeKeys } = require('egjiri-node-kit/dist/objects/objects');
const proxy_1 = require("./utils/proxy");
class Serializer {
    constructor(createModel) {
        this.createModel = createModel;
    }
    normalizePayload(payload) {
        const content = payload.map(item => this.buildModel(item));
        return this.proxyContent(content);
    }
    buildModel(properties) {
        properties = this.transformProperties(properties);
        return this.createModel(properties);
    }
    proxyContent(content, meta = {}) {
        return proxy_1.default(content, { meta: this.transformProperties(meta) });
    }
    transformProperties(properties) {
        return camelizeKeys(properties);
    }
}
exports.default = Serializer;
