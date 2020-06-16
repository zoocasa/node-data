"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unfetch = require('isomorphic-unfetch');
const param = require('jquery-param');
const { dasherize, pluralize } = require('egjiri-node-kit/dist/strings/strings');
class Adapter {
    constructor({ host, namespace, modelName }) {
        this.modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
        this.resourcePath = this.buildResourcePath(host, namespace);
    }
    async query(params) {
        return this.fetch(this.buildUrl(params));
    }
    async queryRecord(id) {
        return this.fetch(this.buildUrl() + '/' + id);
    }
    save(properties) {
        return unfetch(this.buildUrl(), {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify({
                data: {
                    type: this.getNormalizedModel(),
                    attributes: this.normalizeParams(properties),
                }
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
        const response = await unfetch(url, { headers: this.headers() });
        if (response.ok) {
            return response.json()
                .then((payload) => ({ payload, response, error: false }))
                .catch(error => ({ payload: null, response, error }));
        }
        return { payload: null, response, error: response.error || true };
    }
    buildResourcePath(host, namespace) {
        host = host || 'http://localhost:4200';
        return [host, namespace, this.getNormalizedModel()].join('/');
    }
    getNormalizedModel() {
        return dasherize(pluralize(this.modelName));
    }
    buildUrl(params = null) {
        params = param(this.normalizeParams(params));
        if (params) {
            return [this.resourcePath, params].join('?');
        }
        else {
            return this.resourcePath;
        }
    }
}
exports.default = Adapter;
