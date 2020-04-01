import Serializer from '../serializer';

export default class JSONAPISerializer extends Serializer {
  normalizePayload(payload: jsonApiPayload) {
    return payload.data.map(item => this.buildModel(item.attributes));
  }
}

type jsonApiResource = {
  id: string,
  type: string,
  attributes: object,
}

type jsonApiPayload = {
  data: jsonApiResource[]
}
