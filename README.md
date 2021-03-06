
安装：使用@vue/cli=>vue create vue-typescript-demo=>勾选typescrip,选择class风格。

## 在大型项目中使用typescript的原因
- TypeScript 具有类型系统，且是 JavaScript 的超集。 JavaScript 能做的，它能做。JavaScript 不能做的，它也能做。
- TypeScript 已经比较成熟了，市面上相关资料也比较多，大部分的库和框架也读对 TypeScript 做了很好的支持。
- 保证优秀的前提下，它还在积极的开发完善之中，不断地会有新的特性加入进来
- JavaScript 是弱类型并且没有命名空间，导致很难模块化，使得其在大型的协作项目中不是很方便
- vscode、ws 等编辑器对 TypeScript 支持很友好
- TypeScript 在组件以及业务的类型校验上支持比较好；配合好编辑器，如果不按照定义好的类型来的话，编辑器本身就会给你报错，而不会等到编译才来报错
- 命令空间 + 接口申明更方便类型校验，防止代码的不规范
等等等

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

## vue的类组件
- 什么是vue的类组件：通过class来继承vue来写组件，可以写入一些装饰类等用法
- vue-class-component 插件，是vue官方出的
- vue-property-decorator 插件，是vue社区出的，基于vue-class-component，拓展出许多操作符，如@Prop、@Emit、@Inject等，可以说是vue-class-component的一个超集

### vue-property-decorator的装饰器：
  - @Component (完全继承于vue-class-component)
  - @Prop
  - @PropSync
  - @Provide
  - @Model
  - @Watch
  - @Inject
  - @Provide
  - @Emit
  - Mixins (在vue-class-component中定义)

### vue-property-decorator的常用示例
#### 1. @Component
- js写法
```
import { compA, compB } from '@/components';
export default {
    components: {
        compA,
        compB
    }
}
```

- ts写法
```
import {Component,Vue} from 'vue-property-decorator';
import {compA,comptB} from '@/components';
@Component({
  components: {
      compA,
      compB
  }
})

export default class XXX extends Vue {
  ...
}
```

#### 2. @Prop
- js写法
```
export default {
   props: (
       propA: String,
       propB: [Number, String],
       propC: {
           default: 'default value'
       }
   )
}
```

- ts写法
```
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class MyComponent extends Vue {
    @Prop(String) readonly propA: String | undefined
    @Prop([String, Number]) readonly propB: number | string | undefined
    @Prop({default: 'default value'}) readonly propC!: string   // 注意  这里的!标识这个prop一定是非空的
}
```

#### 3. @Watch
- js写法
```
export default {
    watch: {
        val1: [{
            handler: 'onValue1Change',
            immediate: false,
            deep: false
        }],
        val2: [{
            handler: 'onValue2Change',
            immediate: true,
            deep: true
        }]
    }
    
    methods: {
        onVal1Change(newVal, oldVal) {},
        onVal2Change(newVal, oldVal) {}
    }
}
```

- ts写法
```
import {Vue, Component, Watch} from 'vue-property-decorator';
@Component
export default class MyComponent extends Vue {
    @Watch('val1')
    onVal1Change(newVal, oldVal){}
    
    @Watch('val2', {immediate: true, deep: true})
    onVal2Change(newVal, oldVal){}
}
```

#### 4. @Emit
- js写法
```
export default {
    methods: {
        addNumber(n) {
            this.$emit('eventName', n);
        },
        
        otherEvent(params) {
            this.$emit('other-event', params)
        }
    }
}
```

- ts写法
```
import {Vue, Component, Emit} from 'vue-property-decorator';
@Component
export default class MyComponent extends Vue {
  @Emit('eventName')
  addNumber(n: Number) {
      return n
  }
  
  @Emit()  // 如果不提供事件名 默认为函数名  驼峰命名会被转化为kebab-case
  otherEvent(params: string) {
      return params
  }
}
```

#### 5. 计算属性
- js写法
```
export default {
  computed: {
      val: function() {
        // ...
        return xx
      }
  }
}
```


- ts写法
```
// 将该计算属性名定义为一个函数,并在函数前加上get关键字即可
import {Vue, Components} from 'vue-property-decorator'
@Component({})
export default class MyComponent {
  get val() {
      ...
      return xx
  }
}
```
以上就是vue中引入vue-property-decorator后的常用的一些示例。
日常开发中状态管理工具在各模块数据交互传输也起到很重要的作用，就可以用到vuex-class.

### vuex-class的装饰器：
- vuex-class 是一个基于 Vue、Vuex、vue-class-component 的库，和 vue-property-decorator 一样，它也提供了4 个修饰符以及 namespace，解决了 vuex 在 .vue 文件中使用上的不便的问题。
  
  - @State
  - @Getter
  - @Action
  - @Mutation
  
### vuex-class的常用示例
举例：
```
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
const missionModule = namespace('mission');
@Component
export default class ViewMenuConditionComponent extends Vue {
  @missionModule.Getter('getTaskProps') taskProps;   //模块内getters用法，
  @missionModule.Getter('getConditionValues') conditionValues;
  @Action('foo') actionFoo     //全局的action调用方法
  @Mutation('foo') mutationFoo   //全局的mutation调用方法
 
  created () {
    this.taskProps // -> store.mission.taskProps
    this.conditionValues // -> store.mission.conditionValues
    
    this.actionFoo({ value: true }) // -> store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // -> store.commit('foo', { value: true })
  }
  ```

  注意：
  -  从以上代码中可以看出，当分模块调用内部的getters,actions,mutations时，需要引入namespaces,并且调用的时候需要加上@namespacesName
  相关代码：
```
import { namespace } from 'vuex-class';
 
const missionModule = namespace('mission');
 
@missionModule.Getter('getTaskProps') TaskProps;  //在调用的时候可以直接this.TaskProps
```

  - 当在ts中调用全局的state、getters、 actions、mutations时，可以直接通过@State、@Actions、@Getters、@Mutations来获取，在调用时，可以直接使用this来调用。
  相关代码：
```
import { State, Getter, Action, Mutation} from 'vuex-class';
 
@State('foo') stateFoo     //全局的state调用方法
@Action('foo') actionFoo     //全局的action调用方法
@Mutation('foo') mutationFoo   //全局的mutation调用方法
@Getters('foo') getterFoo   //全局的getters调用方法
```
  - 当获取的state，getters，actions，mutations的值和我们要设置的值相同时，可以直接省去，例如：
```
@State foo
@Getter bar
@Action baz
@Mutation qux

//可以直接通过this.foo/this.bar/this.baz/this.qux来调用
```

### 监听路由变化
#### 在js中需要监听路由的变化时，可以通过全局路由守卫、组件内的beforeRouterEnter、beforeRouterLeaver等来监听路由的变化。那么在ts中是如何做到的呢？
- 方法一：使用Watch监听
```
import { Component, Vue, Watch } from 'vue-property-decorator'

@Watch('$route')
routechange(to: any, from: any) {
    console.log(to, from)
}
```

- 方法二：使用路由钩子监听（前提：对钩子进行注册）
```
// 在main.ts中配置
import { Component } from 'vue-property-decorator'
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
```
```
// 在页面内使用
// public beforeRouteLeave(to: any, from: any, next: any) {
//   next()
// }

import { Vue, Component } from 'vue-property-decorator';
// 引入路由中的Route对象
import { Route } from 'vue-router';


@Component({})
export default class App extends Vue {
  // 参数类型的定义，使用Route，
  // next是函数，所以可以直接使用Function对象,
  // 或者是next: () => void
  beforeRouteEnter(to: Route, from: Route, next: Function) {
      next()
  }
}
```


可参考学习的项目：https://github.com/xhonker/ts-cnode 项目