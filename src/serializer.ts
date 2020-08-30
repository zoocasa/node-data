import { camelizeKeys } from 'egjiri-node-kit/dist/objects/objects';
import proxy from 'egjiri-node-kit/dist/proxy/proxy';

export default class Serializer {
  createModel: modelCreator;

  constructor(createModel: modelCreator) {
    this.createModel = createModel;
  }

  public normalizePayload(payload) {
    if (Array.isArray(payload)) {
      const content = payload.map(item => this.buildModel(item));
      return this.proxyContent(content);
    } else {
      return this.buildModel(payload);
    }
  }

  protected buildModel(properties: Record<string, unknown>) {
    properties = this.transformProperties(properties);
    return this.createModel(properties);
  }

  protected proxyContent(content, meta: Record<string, unknown> = {}) {
    return proxy(content, { meta: this.transformProperties(meta) });
  }

  public transformProperties(properties: Record<string, unknown>) {
    return camelizeKeys(properties);
  }
}

type modelCreator = (modelProperties: Record<string, unknown>) => unknown;
