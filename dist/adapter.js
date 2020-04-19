"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unfetch = require('isomorphic-unfetch');
const param = require('jquery-param');
const { dasherize, pluralize } = require('egjiri-node-kit/dist/strings/strings');
class Adapter {
    constructor({ host, namespace, modelName }) {
        this.resourcePath = this.buildResourcePath(host, namespace, modelName);
    }
    fetch(params) {
        return unfetch(this.buildUrl(params));
    }
    // Overwrite in subclass!
    normalizeParams(params) {
        return params;
    }
    buildResourcePath(host, namespace, modelName) {
        host = host || 'http://localhost:4200';
        modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
        return [host, namespace, dasherize(pluralize(modelName))].join('/');
    }
    buildUrl(params) {
        params = param(this.normalizeParams(params));
        return [this.resourcePath, params].join('?');
    }
}
exports.default = Adapter;
