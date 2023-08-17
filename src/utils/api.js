import { BASE_URL } from "../services/constants";
//
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};
//

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
  if (res.success) {
    return res;
  }
  return Promise.reject(res);
};

const request = (path, options) => {
  return fetch(`${BASE_URL}${path}`, options)
    .then(handleResponse)
    .then(checkSuccess);
};

const requestWithTokenRefresh = (path, options) => {
  return request(path, options).catch((err) => {
    if (err.message === "jwt expired") {
      return refreshToken().then((tokenResponse) => {
        localStorage.setItem("accessToken", tokenResponse.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.refreshToken);
        options.headers.authorization = tokenResponse.accessToken;
        return request(path, options);
      });
    } else {
      return Promise.reject(err);
    }
  });
};

const refreshToken = () => {
  return request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export { request, requestWithTokenRefresh };
