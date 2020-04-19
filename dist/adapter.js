"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unfetch = require('isomorphic-unfetch');
const param = require('jquery-param');
const { dasherize, pluralize } = require('egjiri-node-kit/dist/strings/strings');
class Adapter {
    constructor({ host, namespace, modelName }) {
        this.resourcePath = this.buildResourcePath(host, namespace, modelName);
    }
    async query(params) {
        return this.fetch(this.buildUrl(params));
    }
    normalizeParams(params) {
        return params;
    }
    async fetch(url) {
        const response = await unfetch(url);
        if (response.ok) {
            return response.json()
                .then((payload) => ({ payload, response, error: false }))
                .catch(error => ({ payload: null, response, error }));
        }
        return { payload: null, response, error: response.error || true };
    }
    buildResourcePath(host, namespace, modelName) {
        host = host || 'http://localhost:4200';
        modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
        return [host, namespace, dasherize(pluralize(modelName))].join('/');
    }
    buildUrl(params) {
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
