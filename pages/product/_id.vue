<template>
  <div>
    <v-btn @click='goBack' class='mb-4' color='primary'>Назад</v-btn>
    <v-progress-circular indeterminate v-if='loading' />
    <div v-else-if='product'>
      <h2 v-html='product.name' />
      <div>
        <div>
          Создан: {{ parseDate(product.created_at) }}
        </div>
      </div>
      <div>
        <h3>Цена</h3>
        <span>Старая: {{ product.old_price }}</span>
        <span>Текущая: {{ product.price }}</span>
        <span>Премиум: {{ product.premium_price }}</span>
      </div>

      <div class='mt-4'>
        <h3>Состояние</h3>
        <span v-html='product.status.state_name' /> / <span v-html='product.status.state_description' />
      </div>
      <div v-if='product.status.item_errors.length > 0'>
        <h3>Ошибки ({{product.status.item_errors.length}})</h3>
        <div v-for='error in product.status.item_errors'>
          {{ error.field }} - {{ error.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OzonService from '../../services/OzonService'
import { getHumanDate } from '../../helpers/date'

export default {
  data: () => ({
    product: null,
    loading: false
  }),
  methods: {
    async getProductInfo() {
      this.loading = true
      this.product = await OzonService.getProductInfo(this.id);
      this.loading = false
    },
    goBack() {
      this.$router.push('/product/list')
    },
    parseDate(date) {
      return getHumanDate(date)
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  mounted() {
    this.getProductInfo()
  }
}
</script>

<style scoped>

</style>
