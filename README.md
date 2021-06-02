# vue3-country-intl
基于vue3的手机区号、国籍组件，兼容pc、移动端。`vue3-country-intl`有3种模式（
input、popover、modal）

插件支持的国家/地区数据来自：
+ iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
+ country code: https://en.wikipedia.org/wiki/List_of_country_calling_codes

## 效果预览
[https://941477276.github.io/vue3-country-intl/dist/](https://941477276.github.io/vue3-country-intl/dist/)


## 同门师兄弟
>vue版的国籍/手机区号选择插件(`vue-country-intl`)
+ [vue-country-intl](https://github.com/941477276/vue-country-intl)
>react版的国籍/手机区号选择插件(`reaxt-country-intl`)
+ [react-country-intl](https://github.com/941477276/react-country-intl)
>微信小程序版的国籍/手机区号选择插件(`wx-country-intl`)
+ [wx-country-intl](https://github.com/941477276/wx-country-intl)
>基于better-scroll的下拉刷新、上拉加载Vue插件(`vue-scroll-refresh-load`)
+ [vue-scroll-refresh-load](https://github.com/941477276/vue-scroll-refresh-load)

## 安裝
`npm install vue3-country-intl --save`
> 由于使用`rollup`打包后使用不了，因此还没有将其发布到npm上！有大神可以指点下为什么打包后会用不了吗？

## 使用——.vue单文件
```
/*****main.js****/
import Vue3CountryIntl from 'vue3-country-intl';
// 引入css
import 'vue3-country-intl/lib/vue3CountryIntl.css'
// 全局注册组件
Vue.component(Vue3CountryIntl.name, Vue3CountryIntl);

/*****组件中使用****/
<template>
    <vue3-country-intl v-model="countryCode"></vue3-country-intl>
</template>
```

## 使用——直接引入js文件
```
<link rel="stylesheet" href="./lib/vue3CountryIntl.css">
<script src="./lib/vue3-country-intl.min.js"></script>
<script>
  Vue.component('vue3-country-intl', vue3CountryIntl);
  new Vue({
    el: '#app',
    data: {}
  });  
```

## schema=input(默认)
```
<template>
    <Vue3CountryIntl v-model="phoneCountry"></Vue3CountryIntl>
</template>    
```
效果:

![schema=input效果](./src/assets/schema_input.gif)


使用中文显示国籍名称
![使用中文显示国籍名称](./src/assets/use-chinese.gif)

## schema=popover(popover弹窗式)
```
<template>
    <button type="button" id="my_reference">选择手机区号</button>
    <Vue3CountryIntl schema="popover" elId="my_reference" v-model="schemaPopoverData.default">
    </Vue3CountryIntl>
</template>    
```
```
<template>
    <Vue3CountryIntl schema="popover" popover-class="popover-class1111" v-model="schemaPopoverData.default">
        <button type="button" slot="reference">选择手机区号</button>
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
    </Vue3CountryIntl>
</template>    
```
效果:

![schema=popover效果](./src/assets/schema_popover.gif)

## schema=modal(弹窗)
```
<template>
  <button type="button" @click="schemaModalVisible.default = true">选择手机区号</button>
  <Vue3CountryIntl schema="modal" modal-class="modal-class" :listZIndex="5000" v-model:visible="schemaModalVisible.default" v-model="schemaModal.default">
    <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
  </Vue3CountryIntl>
</template>    
```
效果:

![schema=modal效果](./src/assets/schema_modal.gif)

## props 属性
1.`schema`: 展示模式

+ input: 显示为一个input输入框（默认）
+ popover: popover弹窗形式
+ modal: 模态框弹窗形式

2.`type`: 值类型

+ phone: 表示选择手机区号
+ country: 表示选择国籍

3.`placeholder`: schema=input时输入框的placeholder

4.`searchAble`: 是否可以搜索（数据类型：Boolean）

5.`disabled`: 是否禁用（数据类型：Boolean）

6.`showAreaCode`: 输入框中是否显示区号（数据类型：Boolean）

![showAreaCode与showLabelImg](./src/assets/img1.png)

7.`showLabelImg`: 输入框中是否显示图片（数据类型：Boolean）

8.`onlyValue`: 是否只显示选中的值，而不显示国际名称（数据类型：Boolean）

9.`listZIndex`: 列表的层级（数据类型：Number）

10.`maxHeight`: 列表最大高度，pc默认350px，移动端默认240px（数据类型：Number）

11.`selectedText`: 列表中选中项右侧的文案，默认 Selected

12.`showSelectedText`: 列表项被选中时是否显示右侧 'Selected' 文案，默认 true （数据类型：Boolean）

13.`readonly`: 是否只读，默认`false`（数据类型：Boolean）

14.`offsetTop`: popover弹窗距离参照元素的距离。默认为10。只有在`schema=popover`时有效（数据类型：Number）

15.`popoverClass`: popover弹窗额外class。只有在`schema=popover`时有效（数据类型：String）

16.`referenceTrigger`: 点击reference是否可以显示popover弹窗，默认为true。只有在`schema=popover`时有效（数据类型：Boolean）

17.`searchInputPlaceholder`: 搜索输入框的placeholder文字，只有在schema=popover、schema=modal中有效（数据类型：String）

18.`elId`: 触发popover弹窗显示的元素的id，（只在`schema=popover`模式下有效）（数据类型：String）

19.`modalClass`: model弹窗额外class。只有在`schema=modal`时有效（数据类型：String）

20: `visible`: 控制组件显示与隐藏，需使用`sync`语法，如:`:visible.sync="show"`，只在schema=modal模式下有效（数据类型：Boolean）

21: `cancelText`: 关闭弹窗的按钮的文字，默认: '取消'，只在schema=modal模式下有效（数据类型：String）

22: `disableCountry`: 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔（数据类型：String|Array）

23: `onlyCountry`: 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时多个国家使用逗号分隔（数据类型：String|Array）

24: `noDataText`: 未搜索到国家数据时显示的文案，如有`vueCountryNoData`slot则优先显示slot内容（数据类型：String）

25: `iosMobileReadonly`: ios移动终端输入框是否只读(只在`schema=input`模式下有效)，默认为true，因为在ios手机终端中如不是只读模式会弹出选择下来框出来（数据类型：Boolean）

26: `useChinese`: 是否以中文显示国籍名称，默认为`true`（数据类型：Boolean）

27: `animation`: tippy.js 的动画名称，默认为`shift-toward`（数据类型：String）

28: `static`: 是否使用static布局（静态布局）(只在`schema=input`模式下有效)，默认为`false`（数据类型：Boolean）

29: `placement`: tippy.js 的 placement，默认为`top-start`（数据类型：String）

30: `offset`: tippy.js 的 offset，默认为`[0, 10]`（数据类型：Array）


## 可用方法(method)
1.`show`: 显示列表

2.`hide`: 隐藏列表

3.`getSelected`: 获取选中的列表项


## slot
1.`vueCountryNoData`：未搜索到国家数据时显示的slot

## 事件
1.`onChange`: 用户手动选择列表项时触发，会传递selected、value给onChange使用

