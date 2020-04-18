"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("../serializer");
class JSONAPISerializer extends serializer_1.default {
    normalizePayload(payload) {
        const content = payload.data.map(item => this.buildModel(item.attributes));
        return this.proxyContent(content, payload.meta);
    }
}
exports.default = JSONAPISerializer;
