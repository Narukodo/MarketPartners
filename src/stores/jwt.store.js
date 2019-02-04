import { observable, action, reaction, computed } from 'mobx';

const _tokenKey = 'authToken'
const { REACT_APP_JWT } = process.env

export class JWTStore {
  @observable _token = window.localStorage.getItem(_tokenKey) || REACT_APP_JWT;

  constructor() {
    reaction(
      () => this._token,
      token => {
        if (token) {
          window.localStorage.setItem(_tokenKey, token);
        } else {
          window.localStorage.removeItem(_tokenKey);
        }
      }
    );
  }

  @computed get token() {
    return this._token;
  }

  @action logout(token) {
    this.token = undefined;
    return Promise.resolve();
  }
}

export default new JWTStore();
