interface constructorArgs {
    host?: string;
    namespace: string;
    modelName?: string;
}
export default class Adapter {
    modelName: string;
    resourcePath: string;
    constructor({ host, namespace, modelName }: constructorArgs);
    query(params: Record<string, unknown>): Promise<{
        payload: Record<string, unknown> | Record<string, unknown>[];
        response: Response;
        error: boolean;
    } | {
        payload: null;
        response: Response;
        error: any;
    }>;
    queryRecord(id: string | number): Promise<{
        payload: Record<string, unknown> | Record<string, unknown>[];
        response: Response;
        error: boolean;
    } | {
        payload: null;
        response: Response;
        error: any;
    }>;
    save(properties: Record<string, unknown>): Promise<any>;
    headers(): Record<string, string>;
    protected normalizeParams(params: Record<string, unknown>): Record<string, unknown>;
    private fetch;
    private buildResourcePath;
    private getNormalizedModel;
    private buildUrl;
}
export {};
