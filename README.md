### prettier

```
//.prettierrc.json
{
  "singleQuote": true, // 单引号
  "semi": false, // 分号
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

### svg

```
<svg>
  <use xlink:href="#icon-???"></use>
</svg>
```

### 定义全局组件

```
app.component('my-component', {
  // 组件选项 如:props
})
```

### props 组件通信(父与子)

vue3 中通过 defineProps 获取父组件传递的数据(<strong style="color:red">只读</strong>)。

**父组件给子组件传递数据**

```
<Child info="我爱祖国" :money="money"></Child>
```

**方法一: 自定义配置,限制数据**

```
let props = defineProps({
  info:{
   type:String,//接受的数据类型
   default:'默认参数',//接受默认数据
  },
  money:{
   type:Number,
   default:0
}})
```

**方法二: 缩写**

```
let props = defineProps(["info",'money']);
```

### 使用自定义插件封装全局组件

**在建立全局组件的文件夹下新建 index.ts 文件**
<stron style="font-size:14px">此文件必须暴露 install 方法或含有 install 方法的对象</stron>

```
import SvgIcon from "./SvgIcon/index.vue"
import type { App, Component } from 'vue';

// allGlobalComponents这个对象的类型指定
const allGlobalComponents: { [name: string]: Component } = { SvgIcon }

// 对外暴露插件对象
export default {
  install(app: App){
    // Object.keys(allGlobalComponents)用于获取以对象key值组成的数组
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key])
    });
  }
}
```

**在入口文件 main.js 中使用自定义插件**

```
// 引入自定义插件:注册整个项目的全局组件
import globalComponent from "@/components"
// 安装自定义插件
app.use(globalComponent)
```

### element 使用

当 container 容器中的 el-header、el-aside 和 el-main 组件化时,会出现三个在同一行的情况,在 el-container 上添加 `flex-direction: column`解决

#### element 递归使用

问题 1: 递归使用 menu 时无法正确触发 default-active 属性(触发两次到多次导致无法正确展开二级菜单)

#### 全局组件的使用

`<component :is="name"></component>`显示名字为 name 的全局组件
