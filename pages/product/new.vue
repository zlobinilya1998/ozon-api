<template>
  <div>
      <v-text-field v-model='product.name' label='Название продукта'/>

      <v-text-field v-model='product.barcode' label='Артикул'/>
      <v-text-field v-model='product.category_id' label='Номер категории'/>


      <v-text-field v-model='product.old_price' label='Рыночная цена'/>
      <v-text-field v-model='product.price' label='Текущая цена'/>
      <v-text-field v-model='product.premium_price' label='Цена до скидки'/>

      <v-text-field v-model.number='product.weight' label='Вес'/>
      <v-text-field v-model.number='product.height' label='Высота'/>
      <v-text-field v-model.number='product.width' label='Ширина'/>

      <v-btn v-html='"Добавить"' @click='addNewProduct' :loading='loading'/>
  </div>
</template>

<script>
import OzonService from '@/services/OzonService'
import OzonProduct from '@/models/entities/OzonProduct'

export default {
  name: 'new',
  data: () => ({
    product: new OzonProduct(),
    loading: false,
  }),
  methods: {
    async addNewProduct(){
      this.loading = true;
      await OzonService.addProduct(this.product)
      this.loading = false;
      await this.$router.push('/product/list')
    }
  }
}
</script>

<style scoped>

</style>
