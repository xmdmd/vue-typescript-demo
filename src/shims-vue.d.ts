// 用于 TypeScript 识别 .vue 文件， Ts默认并不支持导入 vue 文件，这个文件告诉 ts导入 .vue 文件都按 VueConstructor<Vue>处理
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
