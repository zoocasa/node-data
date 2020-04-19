const { camelizeKeys } = require('egjiri-node-kit/dist/objects/objects');

export default class Serializer {
  createModel: modelCreator;

  constructor(createModel: modelCreator) {
    this.createModel = createModel;
  }

  public normalizePayload(payload) {
    const content = payload.map(item => this.buildModel(item));
    return this.proxyContent(content)
  }

  protected buildModel(properties: object) {
    properties = this.transformProperties(properties);
    return this.createModel(properties);
  }

  protected proxyContent(content: any, meta: object = {}) {
    return new Proxy(content, {
      get: (obj, prop) => {
        // The default behavior to return the value
        if (prop in obj) {
          return obj[prop];
        }

        // Get the meta response properties
        if (prop === 'meta') {
          return this.transformProperties(meta);
        }
      }
    })
  }

  private transformProperties(properties: object) {
    return camelizeKeys(properties);
  }
}

type modelCreator = (modelProperties: object) => object;
