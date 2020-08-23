const { camelizeKeys } = require('egjiri-node-kit/dist/objects/objects');
const proxy = require('egjiri-node-kit/dist/proxy/proxy').default;

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

  protected proxyContent(content: any, meta: Record<string, unknown> = {}) {
    return proxy(content, { meta: this.transformProperties(meta) });
  }

  public transformProperties(properties: Record<string, unknown>) {
    return camelizeKeys(properties);
  }
}

type modelCreator = (modelProperties: Record<string, unknown>) => object;
