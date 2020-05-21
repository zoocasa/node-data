export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: any): any;
    protected buildModel(properties: object): object;
    protected proxyContent(content: any, meta?: object): any;
    transformProperties(properties: object): any;
}
declare type modelCreator = (modelProperties: object) => object;
export {};
