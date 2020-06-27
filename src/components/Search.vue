<template>
  <div class="container">
    <div class="msearch-input" style="box-shadow: 0 0 10px 0 #E9E9E9;">
      <form @submit.prevent="search" class="flex flex-justify-content-between">
        <input type="search" autocomplete="off" autocorrect="off" v-bind:placeholder="placeholder" v-model="keyword" @change="changeKeyword" class="flex-grow-1">
        <div class="button-container flex-shrink-0 padding-h-0-6x">
          <button></button>
        </div>
      </form>
    </div>
    <div v-if="keyword">reverse keyword: {{reversedKeyword}}</div>
  </div>
</template>  

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Prop() private placeholder!: string;

  // 原data
  keyword = ''

  @Emit()  // 如果不提供事件名 默认为函数名
  search() {
      return this.keyword.trim()
  }

  // 计算属性
	private get reversedKeyword (): string {
  	return this.keyword.split('').reverse().join('')
  }
  
  // method
  public changeKeyword (): void {
    this.keyword = 'Good bye'
  }

	// 生命周期
  // private created ()：void { }
  // private mounted ()：void { }
  // private updated ()：void { }
  // private destroyed ()：void { }
}
 
</script>

<style scoped>
.container {
  margin-top: 100px;
}
.msearch-input {
  box-sizing: border-box;
  display: block;
  border: 1px solid #A6ACBC;
  box-shadow: 0 0 10px 0 #e9e9e9;
  border-radius: 2px;
  height: 40px;
  margin: -75px 0 0;
  background: #fff;
  color:#7A808F;
  outline: none;
  overflow: hidden;
}

.msearch-input .button-container {
  position: relative;
}

.msearch-input .button-container::after {
  content: '';
  width: 1px;
  height: 55.6%;
  background: #e3e3e3;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-.5px, -50%);
}

.flex {
  display: flex;
}

flex-justify-content-between {
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.flex-shrink-0 {
  -ms-flex-negative: 0 !important;
  flex-shrink: 0 !important;
}

.padding-h-0-6x {
  padding-left: 10px;
  padding-right: 10px;
}

.msearch-input input {
  display: block;
  border: 0;
  height: 38px;
  line-height: 20px;
  width: 90%;
  padding-left: 15px;
  outline: none;
}

.msearch-input input::-webkit-input-placeholder {
  color: #A6ACBC;
}

.msearch-input input::-moz-placeholder {
  color: #A6ACBC;
}

.msearch-input input::-moz-placeholder {
  color: #A6ACBC;
}

.msearch-input input::-ms-input-placeholder {
  color: #A6ACBC;
}

.msearch-input button {
  background: url('../assets/mhome_search.png') no-repeat center center;
  display: block;
  float: left;
  height: 38px;
  width: 32px;
  border: 0;
  background-size: 20px;
}
</style>
  