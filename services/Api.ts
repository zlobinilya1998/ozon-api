import axios, { AxiosRequestHeaders } from 'axios'

const Api = axios.create({
  baseURL: 'https://api-seller.ozon.ru/',
  timeout: 30_000
})


Api.interceptors.response.use(
  (response) => {
    return response
  }, (error) => {
    const errorStatuses = [401, 403]
    if (errorStatuses.includes(error.response.status)) {
      localStorage.removeItem('credentials')
    }
    return Promise.reject()
  })

Api.interceptors.request.use((config: any) => {
    let credentials: any = localStorage.getItem('credentials')

    if (credentials) {
      credentials = JSON.parse(credentials)
      config.headers.common['Api-Key'] = credentials.api_key
      config.headers.common['Client-id'] = credentials.client_id
    }
    return config

})


export default Api
