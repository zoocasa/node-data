import Serializer from '../serializer';

export default class JSONAPISerializer extends Serializer {
  public normalizePayload(payload: jsonApiPayload) {
    if (Array.isArray(payload.data)) {
      const content = payload.data.map(item => {
        return this.buildModel({ id: item.id, ...item.attributes, ...extractRelationships(item.relationships) });
      });
      return this.proxyContent(content, (payload as jsonAPIIndexPayload).meta);
    } else {
      const { id, attributes, relationships } = (payload as jsonAPIShowPayload).data;
      return this.buildModel({ id, ...attributes, ...extractRelationships(relationships) });
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
  id: number | string;
  type: string;
  attributes: Record<string, unknown>;
  relationships?: Record<string, {
    data: {
      id: string | number;
      type: string;
    };
  }>;
};

type jsonApiPayload = jsonAPIIndexPayload | jsonAPIShowPayload;

type jsonAPIIndexPayload = {
  data: jsonApiResource[];
  meta: Record<string, unknown>;
};

type jsonAPIShowPayload = {
  data: jsonApiResource;
};
