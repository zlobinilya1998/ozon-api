export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        'Accept': 'text/plain, */*',
        'Api-Key': process.env.api_key,
        'Client-id': process.env.client_id,
      }
    }
  })


  // Set baseURL to something different
  api.setBaseURL('https://api-seller.ozon.ru')
  // Inject to context as $api
  inject('ozon', api)
}

