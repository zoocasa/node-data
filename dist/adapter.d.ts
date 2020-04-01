export default class Adapter {
    host: string;
    namespace: string;
    modelName: string;
    constructor({ host, namespace, modelName }: {
        host: any;
        namespace: any;
        modelName: any;
    });
    fetch(params: object): any;
    buildUrl(params: object): string;
    normalizeParams(params: object): object;
}
