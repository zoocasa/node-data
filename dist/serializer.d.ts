export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: any): any;
    buildModel(properties: object): object;
    transformProperties(properties: object): any;
    proxyContent(content: any, meta?: object): any;
}
declare type modelCreator = (modelProperties: object) => object;
export {};
