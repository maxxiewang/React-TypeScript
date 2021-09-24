import React, { Component } from 'react'
import styles from './App.module.css'
// import robots from './mockdata/robots.json'
import Robot from './components/Robots';
import logo from './assets/images/logo.svg'
import ShoppingCart from './components/ShoppingCart';

interface Props{

}
interface State{
  //为什么使用any，资源是来源于网络请求，返回的数据类型不受控制，强行模仿不现实.
  //前端强行定义api的数据类型，违反前后端分离的原则。
  //不能为了使用TS而放弃JavaScript的灵活性。
  robotGallery:any
  count:number
}

export default class App extends Component<Props,State> {
  /* 
    生命周期的第一阶段 ：初始化
    主要是两个函数，第一个初始化state，第二个为compondentDidMount
    将会在组件创建好dom原素后，挂载进页面时调用，只会在组件初始化的时候调用一次

  */
  constructor(props){
    super(props)
    this.state = {
      robotGallery:[],
      count:0
    }    
  }
  
 /* 
  setState是异步处理的，本身提供了一个回调方法(就是第二个参数 )，用来访问处理后的数据
  答案是：异步更新，同步执行。
  setState()本身并非异步，但对state的处理机制给人一种异步的假像，state处理一般发生在生命周期变化的时候。

 */
  //componentDidMount，render函数执行后
  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.setState({ robotGallery: data }));
  }
  render() {
    return (
        <div className={styles.app}>
          <div className={styles.appHeader}>
            <img src={logo} alt="logo" className={styles.appLogo}/>
            <h1>CyberPunk机器人Inc</h1>
          </div>
          {/* 
           此时代码中有连续两个setState，正是因为异步操作的特殊性，所以在使用this.state的时候
           只要生命周期没有变化，state的变化依然会停留在上一次操作中。
           所在在setState的API中接收两个参数，第一个接收对象类型，用来更新state，而第二个
           是组件state的异步操作处理，但第一个操作也可以改为箭头函数
          
          */}
          <button onClick={()=>{
            this.setState((preState,preProps)=>{return {count:preState.count +1}},()=>{
              console.log('this.count第一次',this.state.count)
            })
            this.setState((preState,preProps)=>{return {count:preState.count +1}},()=>{
              console.log('this.count第二次',this.state.count)
            })
          }}>计数器</button>
          <span>count:{this.state.count}</span>
          <ShoppingCart/>
          <div className={styles.robotList}>
            {this.state.robotGallery.map(r => {
            return <Robot id={r.id} email={r.email} name={r.name} key={r.id}/>
            })}
          </div>
        </div>
    )
  }
}
