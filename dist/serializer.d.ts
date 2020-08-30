declare type modelCreator = (modelProperties: Record<string, unknown>) => any;
declare type apiPayload = Record<string, unknown> | Record<string, unknown>[];
export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: apiPayload): any;
    protected buildModel(properties: Record<string, unknown>): any;
    protected proxyContent(content: any, meta?: Record<string, unknown>): any;
    transformProperties(properties: Record<string, unknown>): Record<string, unknown>;
}
export {};
