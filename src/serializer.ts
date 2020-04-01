const { camelizeKeys } = require('egjiri-node-kit/dist/objects/objects');

export default class Serializer {
  createModel: modelCreator;

  constructor(createModel: modelCreator) {
    this.createModel = createModel;
  }

  normalizePayload(payload: any): object {
    return payload.map(item => {
      return this.buildModel(item);
    });
  }

  buildModel(properties: object) {
    properties = this.transformProperties(properties);
    return this.createModel(properties);
  }

  transformProperties(properties: object) {
    return camelizeKeys(properties);
  }
}

type modelCreator = (modelProperties: object) => object;
