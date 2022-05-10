import Api from '~/services/Api'
import OzonProduct from '~/models/entities/OzonProduct'
import { UserCredentials } from '~/models/entities/User'

export default class OzonService {
  static async login(form: UserCredentials) {
    return await Api.get('/v1/categories/tree', {
      headers: {
        'Api-Key': form.api_key,
        'Client-id': form.client_id
      }
    })
  }

  static async getTree() {
    const { data } = await Api.get('/v1/categories/tree')
    return data.result
  }

  static async getProductInfo(productId: string) {
    const { data } = await Api.post('/v2/product/info', {
      offer_id: '',
      product_id: productId,
      sku: 0
    })
    return data.result
  }

  static async addProduct(product: OzonProduct) {
    const { data } = await Api.post('v2/product/import', {
      items: [product]
    })
  }

  static async getMyList() {
    const { data } = await Api.post('v2/product/list')
    return data.result.items
  }

  static async getCategoryById(id: string) {
    const { data } = await Api.post('v2/category/tree', { category_id: id })
    return data.result
  }


  static async getImportStatus(task_id: string) {
    const { data } = await Api.post('/v1/product/import/info', { task_id })
    return data.result
  }

  static async importDigitalCodes(digital_codes: string[], product_id: number) {
    const { data } = await Api.post('/v1/product/upload_digital_codes', { digital_codes, product_id })
    return data.result
  }

  static async getDigitalCodesStatus(task_id: number) {
    const { data } = await Api.post('/v1/product/upload_digital_codes/info', { task_id })
    return data.result
  }
}
