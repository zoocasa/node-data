const unfetch = require('isomorphic-unfetch');
const param = require('jquery-param');
const { dasherize, pluralize } = require('egjiri-node-kit/dist/strings/strings');
import { camelizeKeys } from 'egjiri-node-kit/dist/objects/objects';

interface constructorArgs {
  host?: string,
  namespace: string,
  modelName?: string,
}

export default class Adapter {
  modelName: string;
  resourcePath: string;

  constructor({ host, namespace, modelName }: constructorArgs) {
    this.modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
    this.resourcePath = this.buildResourcePath(host, namespace);
  }

  public async query(params: object) {
    return this.fetch(this.buildUrl(params))
  }

  public save(properties: object) {
    return unfetch(this.buildUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: this.getNormalizedModel(),
          attributes: properties,
        }
      }),
    }).then(async response => {
      const data = await response.json()
      if (data.errors) {
        throw data;
      }
      return data;
    });
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

  private buildResourcePath(host: string, namespace: string) {
    host = host || 'http://localhost:4200';
    return [host, namespace, this.getNormalizedModel()].join('/');
  }

  private getNormalizedModel(): string {
    return dasherize(pluralize(this.modelName));
  }

  private buildUrl(params: object = null) {
    params = param(this.normalizeParams(params));
    if (params) {
      return [this.resourcePath, params].join('?');
    } else {
      return this.resourcePath;
    }
  }
}
