import Serializer from '../serializer';

export default class JSONAPISerializer extends Serializer {
  public normalizePayload(payload: jsonApiPayload) {
    if (Array.isArray(payload.data)) {
      const content = payload.data.map(item => {
        return this.buildModel({ id: item.id, ...item.attributes, ...extractRelationships(item.relationships) });
      });
      return this.proxyContent(content, payload.meta);
    } else {
      const { id, attributes } = payload.data as jsonApiResource;
      return this.buildModel({ id, ...attributes });
    }
  }
}

function extractRelationships(relationshipsData: jsonApiResource['relationships'] = {}) {
  const relationships: Record<string, { id: string | number}> = {};
  Object.keys(relationshipsData).forEach(relationship => {
    relationships[relationship] = { id: relationshipsData[relationship].data.id };
  });
  return relationships;
}

type jsonApiResource = {
  id: number | string,
  type: string,
  attributes: Record<string, unknown>,
  relationships?: Record<string, {
    data: {
      id: string | number,
      type: string
    }
  }>
}

type jsonApiPayload = {
  data: jsonApiResource[],
  meta: Record<string, unknown>,
}
