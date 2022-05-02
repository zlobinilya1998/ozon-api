<template>
  <div>
    <v-progress-circular indeterminate v-if='loading'/>
    <div v-else-if='categories'>
      <Category v-for='category in categories' :key='category.category_id' :category='category'/>
    </div>
  </div>
</template>

<script>
import OzonService from '../services/OzonService'
import Category from '../components/Category'

export default {
  components: { Category },
  data: () => ({
    categories: null,
    loading: false,
  }),
  methods: {
    async getTree(){
      this.loading = true;
      this.categories = await OzonService.getTree();
      this.loading = false;
    },
  },
  mounted() {
    this.getTree();
  }
}
</script>
