import Serializer from '../serializer';
export default class JSONAPISerializer extends Serializer {
    normalizePayload(payload: jsonApiPayload): any;
}
declare type jsonApiResource = {
    id: number | string;
    type: string;
    attributes: object;
};
declare type jsonApiPayload = {
    data: jsonApiResource[];
    meta: object;
};
export {};
