import Adapter from "./adapter";
import Serializer from "./serializer";
export default class Store {
    adapter: Adapter;
    serializer: Serializer;
    constructor(adapter: Adapter, serializer: Serializer);
    query(params?: object): Promise<any>;
    save(properties: object): Promise<object>;
}
