import Store from '../store';
import { camelize } from 'egjiri-node-kit/dist/strings/strings';

export default class JSONAPIStore extends Store {
  save(properties) {
    return super.save(properties).catch(({ errors }) => {
      throw errors.map(({ source, title }) => {
        return {
          attribute: camelize(source.pointer.replace('/data/attributes/', '')),
          message: title,
        };
      });
    });
  }
}
