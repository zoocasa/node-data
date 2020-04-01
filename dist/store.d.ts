import Adapter from "./adapter";
import Serializer from "./serializer";
export default class Store {
    adapter: Adapter;
    serializer: Serializer;
    constructor(adapter: Adapter, serializer: Serializer);
    query(params: object): Promise<object>;
}