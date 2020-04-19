interface constructorArgs {
    host?: string;
    namespace: string;
    modelName?: string;
}
export default class Adapter {
    resourcePath: string;
    constructor({ host, namespace, modelName }: constructorArgs);
    fetch(params: object): any;
    protected normalizeParams(params: object): object;
    private buildResourcePath;
    private buildUrl;
}
export {};
