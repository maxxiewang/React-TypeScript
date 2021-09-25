import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import Robot from './components/Robots';
import logo from './assets/images/logo.svg'
import ShoppingCart from './components/ShoppingCart';


/* 
  useEffect，副作用函数Side-effect  输入参数一样，而输出结果不确定的情况就是副作用
  在使用React时，经常用useEffect，比如通过API获取数据，处理事件订阅等。
  简单来说，APP就是通过副作用与外界产生交流和互动的。
*/

const App: React.FC = (props) => {
  // 实际上这个数组第一个元素就是state的getter，第二个就是state的setter
  const [count, setCount] = useState<number>(0) //count状态的初始化值，即0
  const [robotGallery, setRobotGallery] = useState<any>([]) //初始化为一个空数组
  // setCount是异步的，而且没有重载，不能提供回调接口
  // 那么如何处理异步逻辑呢，一般不需要处理，如果需的话就进入副作用钩子
  /* 
    默认情况下，每下UI渲染或状态改变的时候，useEffect函数都会执行。
    但默认情况下的默作用非常消耗资源，应该选择适当的时机
    第二个参数是数组，数组内是组件的状态列表，如果这个状态列表不为空，useEffect会盯住这个列表内的状态，
    一定列表内状态发生了变化，useEffect就会被执行
    如果第二个参数传入了一个空数组，就类似于componetDidMount，只会在页面初次渲染时调用。
  */
  useEffect(()=>{
    document.title = `点击了${count}次`
  },[count])
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setRobotGallery(data));
  },[])
  return (
        <div className={styles.app}>
          <div className={styles.appHeader}>
            <img src={logo} alt="logo" className={styles.appLogo}/>
            <h1>CyberPunk机器人Inc</h1>
          </div>
          <button onClick={()=>{
            setCount(count +1)
          }}>计数器</button>
          <span>count:{count}</span>
          <ShoppingCart/>
          <div className={styles.robotList}>
            {robotGallery.map(r => {
            return <Robot id={r.id} email={r.email} name={r.name} key={r.id}/>
            })}
          </div>
        </div>
    )
}

export default App
