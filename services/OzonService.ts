import Api from '~/services/Api'
import OzonProduct from '~/models/entities/OzonProduct'

export default class OzonService {
  static async getTree(){
    const { data } = await Api.get('/v1/categories/tree')
    return data.result;
  }
  static async getProductInfo(productId: string){
     const { data } = await Api.post('/v2/product/info',{
       offer_id: "",
       product_id: productId,
       sku: 0,
     });
     return data.result;
  }

  static async addProduct(product: OzonProduct){
    const { data } = await Api.post('v2/product/import',{
      items: [product]
    });
  }
  static async getMyList(){
    const { data } = await Api.post('v2/product/list');
    return data.result.items;
  }
}
