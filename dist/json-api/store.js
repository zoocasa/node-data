"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../store");
const strings_1 = require("egjiri-node-kit/dist/strings/strings");
class JSONAPIStore extends store_1.default {
    save(properties) {
        return super.save(properties).catch((response) => {
            throw {
                errors: response.errors.map(({ source, title }) => {
                    return {
                        attribute: strings_1.camelize(source.pointer.replace('/data/attributes/', '')),
                        message: title,
                    };
                }),
            };
        });
    }
    ;
}
exports.default = JSONAPIStore;
