interface constructorArgs {
    host?: string;
    namespace: string;
    modelName?: string;
}
export default class Adapter {
    modelName: string;
    resourcePath: string;
    constructor({ host, namespace, modelName }: constructorArgs);
    query(params: Record<string, unknown>): Promise<any>;
    queryRecord(id: string | number): Promise<any>;
    save(properties: Record<string, unknown>): any;
    headers(): Record<string, unknown>;
    protected normalizeParams(params: Record<string, unknown>): Record<string, unknown>;
    private fetch;
    private buildResourcePath;
    private getNormalizedModel;
    private buildUrl;
}
export {};
