import Serializer from '../serializer';

export default class JSONAPISerializer extends Serializer {
  normalizePayload(payload: jsonApiPayload) {
    const content = payload.data.map(item => this.buildModel(item.attributes));
    return this.proxyContent(content, payload.meta);
  }
}

type jsonApiResource = {
  id: number | string,
  type: string,
  attributes: object,
}

type jsonApiPayload = {
  data: jsonApiResource[],
  meta: object,
}
