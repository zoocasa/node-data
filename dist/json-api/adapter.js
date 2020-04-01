"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { dasherizeKeys } = require('egjiri-node-kit/dist/objects/objects');
const adapter_1 = require("../adapter");
class JSONAPIAdapter extends adapter_1.default {
    normalizeParams(params) {
        return dasherizeKeys(params);
    }
}
exports.default = JSONAPIAdapter;
