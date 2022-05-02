<template>
  <v-expand-transition appear>
    <div v-if='childrens.length > 0 && showChildren'>
      <div class='py-2 ml-2' v-for='children in childrens'>
        <p v-html='children.title' class='category-title'/>
      </div>
    </div>
  </v-expand-transition>
</template>

<script>
export default {
  props: ['childrens'],
  data: () => ({
    showChildren: false,
  }),
}
</script>

<style scoped lang='scss'>
.category-title {
  transition: .3s;
  cursor: pointer;
  &.active {
    color: deepskyblue;
  }
  &:hover {
    color: deepskyblue;
  }
}
</style>
