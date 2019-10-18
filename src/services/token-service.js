import config from '../config';

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  saveCurrentUserName(user_name) {
    window.localStorage.setItem(config.USERNAME_KEY, user_name);
  },
  getCurrentUserName() {
    return window.localStorage.getItem(config.USERNAME_KEY);
  },
  clearCurrentUserName() {
    window.localStorage.removeItem(config.USERNAME_KEY);
  },
};

export default TokenService;
