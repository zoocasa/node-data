"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { dasherizeKeys } = require('egjiri-node-kit/dist/objects/objects');
const adapter_1 = __importDefault(require("../adapter"));
class JSONAPIAdapter extends adapter_1.default {
    normalizeParams(params) {
        return dasherizeKeys(params);
    }
}
exports.default = JSONAPIAdapter;
