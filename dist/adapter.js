"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unfetch = require('isomorphic-unfetch');
const param = require('jquery-param');
const { dasherize, pluralize } = require('egjiri-node-kit/dist/strings/strings');
class Adapter {
    constructor({ host, namespace, modelName }) {
        this.host = host || 'http://localhost:4200';
        this.namespace = namespace;
        this.modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
    }
    fetch(params) {
        const url = this.buildUrl(params);
        const fullUrl = [this.host, this.namespace, url].join('/');
        return unfetch(fullUrl);
    }
    buildUrl(params) {
        params = param(this.normalizeParams(params));
        const url = dasherize(pluralize(this.modelName));
        return [url, params].join('?');
    }
    // Overwrite in subclass!
    normalizeParams(params) {
        return params;
    }
}
exports.default = Adapter;
