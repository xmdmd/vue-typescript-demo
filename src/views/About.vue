<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" v-model="title2" @blur="onBlur">
    <div>title: {{ title }}</div>
    
    <Search placeholder="请输入企业名，人名，品牌名等" @search="search"></Search>  
    <div class="leftW margin-t-0-3x" v-if="returnValue">返回：{{returnValue}}</div>
  </div>
</template>

<script lang="ts">
// 去掉lang="ts", 使用正常js语法
// import Search from '@/components/Search.vue'
// export default {
//   name: 'Home',
//   components: {
//     Search
//   },
//   data() {
//     return {
//       returnValue: ''
//     }
//   },
//   methods: {
//     search(keyword) {
//       this.returnValue = '搜索' + keyword
//     }
//   }
// }
import { Component, Prop, Vue } from 'vue-property-decorator';
import Search from '@/components/Search.vue'
import { Route } from 'vue-router';
import { State, Mutation} from 'vuex-class';

@Component({
   components: {
    Search
  }
})

export default class Home extends Vue {
  returnValue = ''
  title2 = ''
  // @State(state => state.title) title!:string     //全局的state调用方法
  @State title!:string
  @Mutation setTitle: any

  public beforeRouteEnter(to: Route, from: Route, next: Function) {
    console.log(from, to)
      next()
  }


  public onBlur() {
    this.setTitle(this.title2)
  }
  public search(keyword: String) {
    this.returnValue = '搜索' + keyword
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