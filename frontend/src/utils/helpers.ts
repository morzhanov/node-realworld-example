import session from './session';
import routeUrls from '../configs/routeUrls';

export default {
  logOut() {
    session.removeHeader();
    session.remove();
    window.location.href = routeUrls.home;
  }
};
