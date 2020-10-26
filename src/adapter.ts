import unfetch from 'isomorphic-unfetch';
import param from 'jquery-param';
import { dasherize, pluralize } from '@egjiri/node-kit/strings';

interface constructorArgs {
  host?: string;
  namespace: string;
  modelName?: string;
}

export default class Adapter {
  modelName: string;
  resourcePath: string;

  constructor({ host, namespace, modelName }: constructorArgs) {
    this.modelName = modelName || this.constructor.name.replace(/Adapter$/, '');
    this.resourcePath = this.buildResourcePath(namespace, host);
  }

  public async query(params: Record<string, unknown>) {
    return this.fetch(this.buildUrl(params));
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
        },
      }),
    }).then(async response => {
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

  public headers(): Record<string, string> {
    return {};
  }

  protected normalizeParams(params: Record<string, unknown>) {
    return params;
  }

  private async fetch(url: string) {
    const response = await unfetch(url, { headers: this.headers() });
    if (response.ok) {
      return response.json()
        .then((payload: Record<string, unknown> | Record<string, unknown>[]) => ({ payload, response, error: false }))
        .catch(error => ({ payload: null, response, error }));
    }
    return { payload: null, response, error: true };
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
      const urlParams = param(this.normalizeParams(params));
      return [this.resourcePath, urlParams].join('?');
    } else {
      return this.resourcePath;
    }
  }
}
