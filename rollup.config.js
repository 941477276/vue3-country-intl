import esbuild from 'rollup-plugin-esbuild'; // plugin-esbuild将ts变为js
import vue from 'rollup-plugin-vue'; // plugin-vue将vue结尾的文件变为js
// import css from 'rollup-plugin-css-only'; // 处理css
import styles from "rollup-plugin-styles"; // 提取css至单独的文件
// rollup-plugin-node-resolve 插件可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理
import resolve from 'rollup-plugin-node-resolve'; // 帮助 Rollup 查找外部模块，然后安装
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser"; // 变丑别人看不懂（压缩后的）
import postcss from 'rollup-plugin-postcss';
import rollupReplace from '@rollup/plugin-replace'; // 替换代码中的某些变量
import babel from 'rollup-plugin-babel';

/**
 * 打包教程
 * https://blog.csdn.net/CuiCui_web/article/details/111112271
 * https://blog.csdn.net/li11122212/article/details/101034063
 */

export default {
  input: 'src/components/index.vue', // 输入文件
  // 输出，告诉rollup一些重要的信息
  output: {
    globals: {
      vue: 'Vue' // 我们的仓库实际依赖vue, vue是不需要打包的，所以这里说明我们用了一个全局变量vue
    },
    // assetDir: './assets',
    name: 'Vue3CountryIntl', // 仓库或组件的名字，如果使用<script>引入方式则为暴露在window对象下的全局的变量名称
    file: 'dist/vue3CountryIntl.js', // 我们要生成的文件目录（css是自动创建）
    format: 'esm', // 文件输出格式为UMD，一个统一的模块定义器
    assetFileNames: "[name][extname]", // rollup-plugin-styles插件生成的css文件的名称
    plugins: [terser()] // 插件，（js的丑化，即打包后，不容易阅读的压缩后的文件）； 如果去掉terser()，得到的js代码即为容易阅读的
  },
  plugins: [
    vue({ // 引用的vue插件，即上述引入的插件使用一遍，以及添加一些选项
      include: /\.vue$/,
      // 把单文件组件中的样式，插入到html中的style标签
      css: false,
      // 把组件转换成 render 函数
      //compileTemplate: true
    }),
    /*postcss({
      extensions: [ '.css' ],
    }),*/

    styles({
      // mode: "extract",
      // ... or with relative to output dir/output file's basedir (but not outside of it)
      mode: ["extract", "vue3CountryIntl.css"],
      minimize: true, // 是否压缩文件
      url: {
        publicPath: './', // CSS 文件中 URL 的公共路径
        hash: '[name]-[hash].[ext]'
      }
    }),
    commonjs({
      include: 'node_modules/**', // 包括
      exclude: [],  // 排除
    }),
    resolve(),
    rollupReplace({
      // 替换代码中的 process.env.NODE_ENV
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
      /*__buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15*/
    }),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    esbuild({ // 对所有的js及ts进行编译，编译为ie支持的js(目标为es6)
      include: /\.[jt]s$/,
      // minify: process.env.NODE_ENV === 'production',
      // minify: true,
      minify: false,
      target: 'es2015'
    })
  ]
}
