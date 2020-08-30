import Adapter from './adapter';
import Serializer from './serializer';
export default class Store {
    adapter: Adapter;
    serializer: Serializer;
    constructor(adapter: Adapter, serializer: Serializer);
    query(params?: Record<string, unknown>): Promise<any>;
    queryRecord(id: string | number): Promise<any>;
    save(properties: Record<string, unknown>): any;
}
