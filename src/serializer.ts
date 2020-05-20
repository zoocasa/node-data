const { camelizeKeys } = require('egjiri-node-kit/dist/objects/objects');
const proxy = require('egjiri-node-kit/dist/proxy/proxy').default;

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
    return proxy(content, { meta: this.transformProperties(meta) });
  }

  protected transformProperties(properties: object) {
    return camelizeKeys(properties);
  }
}

interface model {
  save(): Promise<object>;
}
type modelCreator = (modelProperties: object) => model;
