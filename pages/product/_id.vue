<template>
  <div>
    <div v-if='product'>
      {{product}}


      <div class='mt-4'>
        <h3>Состояние</h3>
        <div v-html='product.status.state_name'/>
        <div v-html='product.status.state_description'/>
      </div>
    </div>
  </div>
</template>

<script>
import OzonService from '../../services/OzonService'

export default {
  data: () => ({
    product: null,
  }),
  methods: {
    async getProductInfo(){
      this.product = await OzonService.getProductInfo(this.id);
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  mounted() {
    this.getProductInfo();
  }
}
</script>

<style scoped>

</style>
