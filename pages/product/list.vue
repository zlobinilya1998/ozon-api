<template>
  <div>
    <v-progress-circular indeterminate v-if='loading'/>
    <div v-else-if='list.length > 0'>
      <div v-for='item in list' @click='gotoProduct(item.product_id)'>{{item}}</div>
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
      this.list = await OzonService.getMyList();
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

