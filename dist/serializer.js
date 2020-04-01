"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { camelizeKeys } = require('egjiri-node-kit/dist/objects/objects');
class Serializer {
    constructor(createModel) {
        this.createModel = createModel;
    }
    normalizePayload(payload) {
        return payload.map(item => {
            return this.buildModel(item);
        });
    }
    buildModel(properties) {
        properties = this.transformProperties(properties);
        return this.createModel(properties);
    }
    transformProperties(properties) {
        return camelizeKeys(properties);
    }
}
exports.default = Serializer;
