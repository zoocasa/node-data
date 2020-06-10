"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("../serializer");
class JSONAPISerializer extends serializer_1.default {
    normalizePayload(payload) {
        if (Array.isArray(payload.data)) {
            const content = payload.data.map(item => this.buildModel({ id: item.id, ...item.attributes }));
            return this.proxyContent(content, payload.meta);
        }
        else {
            const { id, attributes } = payload.data;
            return this.buildModel({ id, ...attributes });
        }
    }
}
exports.default = JSONAPISerializer;
