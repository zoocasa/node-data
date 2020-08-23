export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: any): any;
    protected buildModel(properties: Record<string, unknown>): object;
    protected proxyContent(content: any, meta?: Record<string, unknown>): any;
    transformProperties(properties: Record<string, unknown>): any;
}
declare type modelCreator = (modelProperties: Record<string, unknown>) => object;
export {};
