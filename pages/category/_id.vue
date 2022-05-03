<template>
  <div>
    <v-btn class='mb-4' v-if='$route.params.id' @click='$router.go(-1)'>
      <v-icon>mdi-arrow-left</v-icon>
      Назад
    </v-btn>
    <h3 v-html='category.title' class='mb-2'/>
    <v-data-table
      :headers='table.headers'
      :items='category.children'
      :loading='loading'
      :items-per-page='15'
      class='elevation-1'
      @click:row='getCategoryInfo'
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    table: {
      headers: [
        {
          text: 'Категория',
          sortable: true,
          value: 'title'
        },
        {
          text: 'Индекс',
          sortable: true,
          value: 'category_id'
        },
        {
          text: 'Подкатегории',
          sortable: true,
          value: 'children.length'
        },
      ]
    },
    category: {},
  }),
  methods:{
    async getCategory() {
      this.loading = true;
      const res = await this.$store.dispatch('products/getCategoryById', this.$route.params.id);
      this.category = res[0];
      this.loading = false;
    },
    getCategoryInfo(val){
      if (val.children.length === 0 ) return;
      this.$router.push('/category/' + val.category_id)
    },
  },
  mounted() {
    this.getCategory();
  }
}
</script>

<style lang='scss'>
.v-data-table {
  tbody {
    tr {
      cursor: pointer;
    }
  }
}
</style>
