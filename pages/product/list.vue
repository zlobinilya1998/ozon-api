<template>
  <div>
    <v-progress-circular indeterminate v-if='loading'/>
    <div v-else-if='list.length > 0'>
      <h3 class='mb-3'>Артикулы</h3>
      <v-btn v-for='item in list' @click='gotoProduct(item.id)' :key='item.product_id' class='mr-2' color='primary'>{{item.name}}</v-btn>
    </div>
  </div>
</template>

<script>
import OzonService from '../../services/OzonService'

export default {
  name: 'new',
  data: () => ({
    list: [],
    loading: false,
  }),
  methods: {
    async getList(){
      this.loading = true;

      const res = await OzonService.getMyList();
      this.list = await Promise.all(res.map(item => OzonService.getProductInfo(item.product_id)));

      this.loading = false;
    },
    gotoProduct(id){
      this.$router.push('/product/' + id)
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>

</style>

