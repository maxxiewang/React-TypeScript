import React, { Component } from 'react'
import styles from './ShoppingCart.module.css'
import {FiShoppingCart} from 'react-icons/fi'
import {appContext} from '../AppState'

/* 
  Component,
*/
// 给一个对象定义类型,要么使用type,要么使用interface
interface Props{

}
interface State{
  isOpen:boolean
}

export default class ShoppingCart extends Component<Props,State> {
  constructor(props:Props){
    super(props)
    this.state = {
      isOpen:false
    }
  }
  //这里面e的类型不会与onClick的类型自动绑定，写any也可以
  handleClick = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{ 
    // console.log('target',e.target) //target描述的是事件发生的元素
    // console.log('currentTarget',e.currentTarget)//currentTarget描述的是事件处理绑定的元素
    if((e.target as HTMLElement).nodeName === 'SPAN'){
      this.setState({isOpen:!this.state.isOpen})
    }
    
  }
  render() {
    return (
      <appContext.Consumer>
        {(value)=>{
          return (
            <div className={styles.cartContainer}>
              <button className={styles.button}
              onClick={this.handleClick}
              >
                <FiShoppingCart/>
                <span>购物车{value.shoppingCart.items.length}(件)</span>
              </button>
              <div className={styles.cartDropDown} style={{display:this.state.isOpen?'block':'none'}}>
                <ul>
                  {value.shoppingCart.items.map(item=>{
                    return (<li key={item.id}>{item.name}</li>)
                  })}
                </ul>
              </div>
            </div>
          )
        }}
      </appContext.Consumer>
      
    )
  }
}
