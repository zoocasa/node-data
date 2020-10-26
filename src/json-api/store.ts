import Store from '../store';
import { camelize } from '@egjiri/node-kit/strings';

type ErrorObjects = {
  errors: {
    source?: {
      pointer?: string;
    };
    title?: string;
  }[];
};

export default class JSONAPIStore extends Store {
  save(properties: Record<string, unknown>) {
    return super.save(properties).catch((response: ErrorObjects) => {
      throw {
        errors: response.errors.map(({ source, title }) => {
          return {
            attribute: camelize((source?.pointer || '').replace('/data/attributes/', '')),
            message: title,
          };
        }),
      };
    });
  }
}
