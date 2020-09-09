"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("@egjiri/node-kit/objects");
const adapter_1 = __importDefault(require("../adapter"));
class JSONAPIAdapter extends adapter_1.default {
    normalizeParams(params) {
        return objects_1.dasherizeKeys(params);
    }
}
exports.default = JSONAPIAdapter;
