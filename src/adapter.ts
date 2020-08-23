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
    this.resourcePath = this.buildResourcePath(namespace, host);
  }

  public async query(params: Record<string, unknown>) {
    return this.fetch(this.buildUrl(params))
  }

  public async queryRecord(id: string | number) {
    return this.fetch(this.buildUrl() + '/' + id);
  }

  public save(properties: Record<string, unknown>) {
    return unfetch(this.buildUrl(), {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({
        data: {
          type: this.getNormalizedModel(),
          attributes: this.normalizeParams(properties),
        }
      }),
    }).then(async response => {
      if (response.status === 204) {
        return null;
      }
      const data = await response.json()
      if (data.errors) {
        throw data;
      }
      return data;
    });
  }

  public headers(): Record<string, unknown> {
    return {}
  }

  protected normalizeParams(params: Record<string, unknown>) {
    return params;
  }

  private async fetch(url: string) {
    const response = await unfetch(url, { headers: this.headers() });
    if (response.ok) {
      return response.json()
        .then((payload: Record<string, unknown>[]) => ({ payload, response, error: false }))
        .catch(error => ({ payload: null, response, error }));
    }
    return { payload: null, response, error: response.error || true };
  }

  private buildResourcePath(namespace: string, host?: string) {
  host = host || 'http://localhost:4200';
    return [host, namespace, this.getNormalizedModel()].join('/');
  }

  private getNormalizedModel(): string {
    return dasherize(pluralize(this.modelName));
  }

  private buildUrl(params?: Record<string, unknown>) {
    if (params) {
      params = param(this.normalizeParams(params));
      return [this.resourcePath, params].join('?');
    } else {
      return this.resourcePath;
    }
  }
}
