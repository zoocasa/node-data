import Serializer from '../serializer';
export default class JSONAPISerializer extends Serializer {
    normalizePayload(payload: jsonApiPayload): any;
}
declare type jsonApiResource = {
    id: number | string;
    type: string;
    attributes: Record<string, unknown>;
};
declare type jsonApiPayload = {
    data: jsonApiResource[];
    meta: Record<string, unknown>;
};
export {};
