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

  public async query(params: object) {
    return this.fetch(this.buildUrl(params))
  }

  protected normalizeParams(params: object) {
    return params;
  }

  private async fetch(url: string) {
    const response = await unfetch(url);
    if (response.ok) {
      return response.json()
        .then((payload: object[]) => ({ payload, response, error: false }))
        .catch(error => ({ payload: null, response, error }));
    }
    return { payload: null, response, error: response.error || true };
  }

  private buildResourcePath(host: string, namespace: string, modelName: string) {
    host = host || 'http://localhost:4200';
    modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
    return [host, namespace, dasherize(pluralize(modelName))].join('/');
  }

  private buildUrl(params: object) {
    params = param(this.normalizeParams(params));
    if (params) {
      return [this.resourcePath, params].join('?');
    } else {
      return this.resourcePath;
    }
  }
}
