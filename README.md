# vue-typescript-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## vue组件的ts写法
- 从 vue2.5 之后，vue 对 ts 有更好的支持。根据官方文档，vue 结合 typescript ，有两种书写方式
  - Vue.extend
  ```
  import Vue from 'vue
  const Component = Vue.extent({
    // type inference enabled
  })
  ```

  - vue-class-component
  ```
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class Test extends Vue {
    @props({ type: Object })
    private test: { value: string }
  }
  ```
- 理想情况下， Vue.extend 的书写方式，是学习成本最低的。在现有写法的基础上，几乎 0 成本的迁移。
但是 Vue.extend模式，需要与 mixins 结合使用。在 mixin 中定义的方法，不会被 typescript 识别到，这就意味着会出现丢失代码提示、类型检查、编译报错等问题。


## vue-class-component
- 修饰器函数 '@'
  引用、调用它所修饰的函数
eg：
```
  class Example {
　　@logMethod(1)
　　@logMethod(2)
　　sum(a,b) {
　　　　return a + b ;
　　}
  }

  function logMethod(id) {
　　console.log('evaluated logMethod'+id);
　　return (target, name, desctiptor) => console.log('excute logMethod' + id)
}
```

最终返回：
```
  evaluated logMethod 1
  evaluated logMethod 2
  excute logMethod 2
  excute logMethod 1
```

使用babel在线版的REPL[https://babeljs.io/repl]，执行得到a.js

修饰器执行顺序，由内向外执行
注意：修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。类是不会提升的，所以就没有这方面的问题。
