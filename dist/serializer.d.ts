export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: any): object;
    buildModel(properties: object): object;
    transformProperties(properties: object): any;
}
declare type modelCreator = (modelProperties: object) => object;
export {};
