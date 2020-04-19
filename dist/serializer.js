"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { camelizeKeys } = require('egjiri-node-kit/dist/objects/objects');
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
        return new Proxy(content, {
            get: (obj, prop) => {
                // The default behavior to return the value
                if (prop in obj) {
                    return obj[prop];
                }
                // Get the meta response properties
                if (prop === 'meta') {
                    return this.transformProperties(meta);
                }
            }
        });
    }
    transformProperties(properties) {
        return camelizeKeys(properties);
    }
}
exports.default = Serializer;
