export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: any): any;
    protected buildModel(properties: object): object;
    protected proxyContent(content: any, meta?: object): any;
    private transformProperties;
}
declare type modelCreator = (modelProperties: object) => object;
export {};
