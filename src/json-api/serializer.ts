import Serializer from '../serializer';

export default class JSONAPISerializer extends Serializer {
  public normalizePayload(payload: jsonApiPayload) {
    if (Array.isArray(payload.data)) {
      const content = payload.data.map(item => this.buildModel({ id: item.id, ...item.attributes }));
      return this.proxyContent(content, payload.meta);
    } else {
      const { id, attributes } = payload.data as jsonApiResource;
      return this.buildModel({ id, ...attributes });
    }
  }
}

type jsonApiResource = {
  id: number | string,
  type: string,
  attributes: Record<string, unknown>,
}

type jsonApiPayload = {
  data: jsonApiResource[],
  meta: Record<string, unknown>,
}
