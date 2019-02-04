import axios from 'axios'
import { jwtStore } from 'stores'

const { REACT_APP_API_ORIGIN } = process.env
const API_ROOT = `${REACT_APP_API_ORIGIN}/ops/v1/`;


const tokenPlugin = req => {
  if (jwtStore.token) {
    req.headers.Authorization =`${jwtStore.token}`;
  }
  return req;
};

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    jwtStore.logout();
  }
  return err;
};

const responseBody = ({ data }) => data;


const instance = axios.create({
  baseURL: API_ROOT,
  timeout: 4000,
  headers: {'Content-Type': 'application/json'},
});

instance.interceptors.request.use(tokenPlugin);
instance.interceptors.response.use(responseBody);


const requests = {
  del: async url =>
    instance
      .del(`${API_ROOT}${url}`)
      .catch(handleErrors),
  get: async url =>
    instance
      .get(`${API_ROOT}${url}`)
      .catch(handleErrors),
  put: async (url, body) =>
    instance
      .put(`${API_ROOT}${url}`, body)
      .catch(handleErrors),
  post: async (url, body) =>
    instance
      .post(`${API_ROOT}${url}`, body)
      .catch(handleErrors),
};


export default requests;
