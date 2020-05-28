// 引入axios
import store from "../vuex/state";

import axios from 'axios'

let http = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  transformRequest: function (data) {
    // 对 data 进行任意转换处理
    return JSON.stringify(data);;
  }
});

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data:  method === 'POST' || method === 'PUT' || method === 'DELETE'? params : null,
    params: method === 'GET'  ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

http.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.common['Token']=store.state.user.token
  }
  return config;
}, err => {
  return Promise.reject(err);
});

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
