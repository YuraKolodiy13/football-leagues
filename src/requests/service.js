import axios from 'axios';

class Service {
  constructor() {
    let service = axios.create();
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('token');
    }
    return Promise.reject(error)
  };


  get(path, params, callback) {
    return this.service.get(path, {
      params,
    }).then(
      (response) => callback ? callback(response.status, response.data) : response
    );
  };

  getWithToken(path, params, callback) {
    return this.service.get(path, {
      headers: {
        'X-Auth-Token': '31336b5c4c164aefb58d709315a65f81'
      },
      params,
    }).then(
      (response) => callback ? callback(response.status, response.data) : response
    );
  }

  put(put, payload, callback) {
    return this.service.request({
      method: 'PUT',
      url: put,
      responseType: 'json',
      data: payload,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => callback ? callback(response.status, response.data) : response)
  }

  post(path, payload, callback) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => callback ? callback(response.status, response.data) : response)
  }

  delete(path, payload, callback) {
    return this.service.request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((response) => callback ? callback(response.status, response.data) : response)
  }

}

export default new Service();