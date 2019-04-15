import session from './session';
import routeUrls from '../configs/routeUrls';

interface ErrorData {
  error: string;
  field: string;
  [key: string]: string;
}

interface GraphQLError {
  extensions: {
    exception: {
      errors?: ErrorData[];
    } & ErrorData;
  };
}

export default {
  logOut() {
    session.remove();
    window.location.href = routeUrls.home;
  },

  parseErrors(errs: GraphQLError[]): any {
    const errors: any = {};
    for (const err of errs) {
      const {
        extensions: { exception }
      } = err;
      if (exception.errors) {
        for (const e of exception.errors) {
          errors[e.field] = e.error;
        }
      }
      errors[exception.field] = exception.error;
    }
    return errors;
  }
};
