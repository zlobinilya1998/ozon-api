<template>
  <div>
    <h3 class='mb-2'>Все категории</h3>
    <v-data-table
      :headers='table.headers'
      :items='categories'
      :loading='loading'
      :items-per-page='15'
      class='elevation-1'
    >
      <template #item.title="{ item }">
        <v-tooltip right>
          <template #activator="{ on }">
            <v-chip dark v-on="on" @click='getCategoryInfo(item)'>{{ item.title }}</v-chip>
          </template>
          <span>Нажмите, чтобы открыть подкатегории</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Category from '~/components/Category'

export default {
  components: { Category },
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
    }
  }),
  computed: {
    categories() {
      return this.$store.state.products.categories
    }
  },
  methods: {
    async getCategories() {
      this.loading = true
      await this.$store.dispatch('products/getCategories')
      this.loading = false
    },
    getCategoryInfo(val){
      this.$router.push('/category/' + val.category_id)
    }
  },
  mounted() {
    this.getCategories()
  }
}
</script>

<style scoped lang='scss'>
.v-data-table {
  tbody {
    tr {
      cursor: pointer;
    }
  }
}
</style>
