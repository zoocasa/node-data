"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
const jquery_param_1 = __importDefault(require("jquery-param"));
const strings_1 = require("@egjiri/node-kit/strings");
class Adapter {
    constructor({ host, namespace, modelName }) {
        this.modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
        this.resourcePath = this.buildResourcePath(namespace, host);
    }
    async query(params) {
        return this.fetch(this.buildUrl(params));
    }
    async queryRecord(id) {
        return this.fetch(this.buildUrl() + '/' + id);
    }
    save(properties) {
        return isomorphic_unfetch_1.default(this.buildUrl(), {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify({
                data: {
                    type: this.getNormalizedModel(),
                    attributes: this.normalizeParams(properties),
                },
            }),
        }).then(async (response) => {
            if (response.status === 204) {
                return null;
            }
            const data = await response.json();
            if (data.errors) {
                throw data;
            }
            return data;
        });
    }
    headers() {
        return {};
    }
    normalizeParams(params) {
        return params;
    }
    async fetch(url) {
        const response = await isomorphic_unfetch_1.default(url, { headers: this.headers() });
        if (response.ok) {
            return response.json()
                .then((payload) => ({ payload, response, error: false }))
                .catch(error => ({ payload: null, response, error }));
        }
        return { payload: null, response, error: true };
    }
    buildResourcePath(namespace, host) {
        host = host || 'http://localhost:4200';
        return [host, namespace, this.getNormalizedModel()].join('/');
    }
    getNormalizedModel() {
        return strings_1.dasherize(strings_1.pluralize(this.modelName));
    }
    buildUrl(params) {
        if (params) {
            const urlParams = jquery_param_1.default(this.normalizeParams(params));
            return [this.resourcePath, urlParams].join('?');
        }
        else {
            return this.resourcePath;
        }
    }
}
exports.default = Adapter;
