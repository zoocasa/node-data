"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serializer_1 = require("../serializer");
class JSONAPISerializer extends serializer_1.default {
    normalizePayload(payload) {
        return payload.data.map(item => this.buildModel(item.attributes));
    }
}
exports.default = JSONAPISerializer;
