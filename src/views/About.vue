<template>
  <div class="about">
    <h1>This is an about page</h1>
    
    <Search placeholder="请输入企业名，人名，品牌名等" @search="search"></Search>  
    <div class="leftW margin-t-0-3x" v-if="returnValue">返回：{{returnValue}}</div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  name: 'Home',
  components: {
    Search
  },
  data() {
    return {
      returnValue: ''
    }
  },
  methods: {
    search(keyword) {
      this.returnValue = '搜索' + keyword
    }
  }
}
</script>

<style scoped>
.leftW {
  text-align: left;
}

.margin-t-0-3x {
  margin-top: 5px;
}
</style>