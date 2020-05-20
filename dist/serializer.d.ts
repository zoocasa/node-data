export default class Serializer {
    createModel: modelCreator;
    constructor(createModel: modelCreator);
    normalizePayload(payload: any): any;
    protected buildModel(properties: object): model;
    protected proxyContent(content: any, meta?: object): any;
    protected transformProperties(properties: object): any;
}
interface model {
    save(): Promise<object>;
}
declare type modelCreator = (modelProperties: object) => model;
export {};
