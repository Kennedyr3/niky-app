import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  "x-api-key": "N77SCkHp2H4oCoJNLJLId1WKC8jINp2G92wyctp0",
  // "token": "b154f1ecdb152414b2837fccebb410377e1e",
}

export const API = axios.create({
  baseURL: 'https://knhjwn6xdf.execute-api.sa-east-1.amazonaws.com/prod/',
  headers,
})

API.interceptors.request.use(async (config) => {
  const requestConfig = config
  const [token] = await Promise.all([localStorage.getItem('token')])
  if (token) {
    requestConfig.headers.token = token
  }
  return config;
});

API.interceptors.response.use(async (value) => {
  return Promise.resolve(value);
},
  (error) => {
    const { isAxiosError = false, response = null } = error;
    console.log('ss', response)
    if (response && response.status === 403) {
      localStorage.clear()
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
