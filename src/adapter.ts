const unfetch = require('isomorphic-unfetch');
const param = require('jquery-param');
const { dasherize, pluralize } = require('egjiri-node-kit/dist/strings/strings');

interface constructorArgs {
  host?: string,
  namespace: string,
  modelName?: string,
}

export default class Adapter {
  resourcePath: string;

  constructor({ host, namespace, modelName }: constructorArgs) {
    this.resourcePath = this.buildResourcePath(host, namespace, modelName);
  }

  public fetch(params: object) {
    return unfetch(this.buildUrl(params));
  }

  // Overwrite in subclass!
  protected normalizeParams(params: object) {
    return params;
  }

  private buildResourcePath(host: string, namespace: string, modelName: string) {
    host = host || 'http://localhost:4200';
    modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
    return [host, namespace, dasherize(pluralize(modelName))].join('/');
  }

  private buildUrl(params: object) {
    params = param(this.normalizeParams(params));
    return [this.resourcePath, params].join('?');
  }
}
