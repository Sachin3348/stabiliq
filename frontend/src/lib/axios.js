import axios from "axios";

class ApiHandler {
  constructor({ baseURL, headers } = {}) {
    this.client = axios.create({ baseURL, headers });
    this.client.interceptors.request.use(
      (config) => {
        const token = "";
        if (token) {
          config.headers.common["x-access-token"] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      ({ data }) => data,
      async (error) => {
        // re-throw the error
        console.log("error here", error)
        throw {
          message: error.response?.data?.message || "Something went wrong",
          status: error.response?.data?.status || "failure",
          statusCode: error.response?.status,
          data: error.response?.data,
          cancelled: axios.isCancel(error),
        };
      }
    );
  }

  makeRequest(reqType, config) {
    return this.client.request({
      ...config,
      method: reqType,
    });
  }

  get(config) {
    return this.makeRequest("get", config);
  }

  patch(config) {
    return this.makeRequest("patch", config);
  }

  put(config) {
    return this.makeRequest("put", config);
  }

  post(config) {
    return this.makeRequest("post", config);
  }

  delete(config) {
    return this.makeRequest("delete", config);
  }
}

export default ApiHandler;
