import axios, { AxiosRequestHeaders } from 'axios'

const headers: any = {
  'Accept': 'text/plain, */*',
  'Api-Key': process.env.api_key,
  'Client-id': process.env.client_id,
}

const Api = axios.create({
  baseURL: 'https://api-seller.ozon.ru/',
  timeout: 1000,
  headers,
});


Api.interceptors.response.use((config) => {
  return config
});




export default Api
