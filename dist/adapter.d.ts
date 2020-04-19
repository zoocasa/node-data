interface constructorArgs {
    host?: string;
    namespace: string;
    modelName?: string;
}
export default class Adapter {
    resourcePath: string;
    constructor({ host, namespace, modelName }: constructorArgs);
    query(params: object): Promise<any>;
    protected normalizeParams(params: object): object;
    private fetch;
    private buildResourcePath;
    private buildUrl;
}
export {};
