"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../store"));
const strings_1 = require("egjiri-node-kit/dist/strings/strings");
class JSONAPIStore extends store_1.default {
    save(properties) {
        return super.save(properties).catch((response) => {
            throw {
                errors: response.errors.map(({ source, title }) => {
                    return {
                        attribute: strings_1.camelize(((source === null || source === void 0 ? void 0 : source.pointer) || '').replace('/data/attributes/', '')),
                        message: title,
                    };
                }),
            };
        });
    }
}
exports.default = JSONAPIStore;
