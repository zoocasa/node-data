export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: any): any;
    protected buildModel(properties: Record<string, unknown>): unknown;
    protected proxyContent(content: any, meta?: Record<string, unknown>): any;
    transformProperties(properties: Record<string, unknown>): Record<string, unknown>;
}
declare type modelCreator = (modelProperties: Record<string, unknown>) => unknown;
export {};
