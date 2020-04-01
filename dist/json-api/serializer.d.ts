import Serializer from '../serializer';
export default class JSONAPISerializer extends Serializer {
    normalizePayload(payload: jsonApiPayload): object[];
}
declare type jsonApiResource = {
    id: string;
    type: string;
    attributes: object;
};
declare type jsonApiPayload = {
    data: jsonApiResource[];
};
export {};
