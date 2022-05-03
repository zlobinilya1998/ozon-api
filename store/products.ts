import OzonService from '~/services/OzonService'

class ProductsState {
  list = [];
  categories = [];
}

const ProductsStore = {
  state: new ProductsState() as ProductsState,
  mutations: {
    setCategories(state: ProductsState,payload: any){
      state.categories = payload;
    }
  },
  actions: {
    async getCategories({ commit }: any){
      const categories = await OzonService.getTree();
      commit('setCategories',categories);
    },
    async getCategoryById(store: any,id: string){
      return await OzonService.getCategoryById(id);
    }
  }
}

export default ProductsStore;

