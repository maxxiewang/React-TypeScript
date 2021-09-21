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
  constructor(props){
    super(props)
    this.state = {
      robotGallery:[],
      count:0
    }    
  }
  /* 
    componentDidMount，render函数执行后
  */
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
          <button onClick={()=>{
            this.setState({count:this.state.count +1})
            console.log('this.count',this.state.count)
          }}>计数器</button>
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
