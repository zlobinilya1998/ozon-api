<template>
  <div>
    <p v-html='category.title' class='category-title'/>
    <ChildrenList :childrens='category.children'/>
  </div>
</template>

<script>
import ChildrenList from './ChildrenList'
export default {
  components: { ChildrenList },
  props: ['category'],
}
</script>

<style scoped lang='scss'>
.category-title {
  transition: .3s;
  cursor: pointer;
  &:hover {
    color: deepskyblue;
  }
}
</style>
