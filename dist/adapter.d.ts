interface constructorArgs {
    host?: string;
    namespace: string;
    modelName?: string;
}
export default class Adapter {
    modelName: string;
    resourcePath: string;
    constructor({ host, namespace, modelName }: constructorArgs);
    query(params: object): Promise<any>;
    save(properties: object): any;
    protected normalizeParams(params: object): object;
    private fetch;
    private buildResourcePath;
    private getNormalizedModel;
    private buildUrl;
}
export {};
