import Store from '../store';
export default class JSONAPIStore extends Store {
    save(properties: Record<string, unknown>): Promise<any>;
}
