# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `CSS module(模组化)`

每个 JSX 或者 TSX 文件就被视为一个独立存在的原件。
原件所包含的所有内容也同样都应该是独立存在的
通过访问对象来独立加载组件样式：
import './index.css' -> import style from './index.css'
JSS 模块化引入组件,把 CSS 转化为对象,通过对象的方式,模块化引入组件
import style from './index.css'

<div className={style.app}/>

### --save-dev

区分普通依赖与 dev 依赖,dev 依赖:仅参与代码开发而不参与最终上线打包的项目
包括 type-script 都可以安装在 dev 依赖下面

构造函数 constructor 是唯一可以初始化 state 的地方
State 的更新是异步的,
调用 setState 后,state 不会立刻改变,是异步操作.
不能依赖当前的 state 来讲算下一个 state，因为 react 会把多次的 state 修改合并成一个

Props:Properties 的缩写，组件属性。
本质上，props 就是传入函数的参数，是从组件外部传入组件内部的数据，更准确地说，是从父组件向子组件传递的数据。
所有的 props 全部都是只读的(immutable)，对象一旦创建就不可改变，只能通过销毁、重建来改变数据。
通过判断内存地址是否一致，来确认对象是否有经过修改。
