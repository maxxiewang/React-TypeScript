import React,{useContext} from 'react' // useContext钩子函数
import styles from './Robot.module.css'
// 引入上下文关系对象
import {appContext ,appSetStateContext} from '../AppState'

interface RobotProps {
  id:number,
  name:string,
  email:string
}
/* 
  函数式组件，
  type React.FC<P = {}> = React.FunctionComponent<P>
  泛型类可确保在整个类中一致地使用指定的数据类型。在使用 Typescript 的 React 项目中使用了以下约定：
    type Props = {
        className?: string
        ...
      };

      type State = {
        submitted?: bool
        ...
      };

      class MyComponent extends React.Component<Props, State> {
        ...
    }
  我们将泛型与 React 组件一起使用，以确保组件的 props 和 state 是类型安全的。
  https://blog.csdn.net/semlinker/article/details/106882403/
*/


const Robot: React.FC<RobotProps> = ({id,name,email})=>{
  // 访问上下文关系对象
  const value = useContext(appContext)
  const setState = useContext(appSetStateContext)
  /* 
    因为setState初始化的时候是一个undefined，所以在使用时应该做一个判断
  */
  const addToCart = ()=>{
    //如果setState不为空
    if(setState){
      // 这个setState是全局变量state的setter，所以可以向参数中传递匿名函数的形式来更新state
      setState(state =>{
        return { // 有undefined的可能，尝试自定义hook来处理
          ...state,
          shoppinCart:{
            items:[...state.shoppingCart.items,{id,name}]
          }
        }
      })
    }
  }
  return (
    // <appContext.Consumer>
    //   {(value)=>{
    //     return <div className={styles.cardContainer}>
    //     <img src={`https://robohash.org/${id}`} alt="robot" />
    //     <h2>{name}</h2>
    //     <p>{email}</p>
    //     <p>{value.userName}</p>
    //   </div>  
    //   }}
    // </appContext.Consumer>
    <div className={styles.cardContainer}>
     <img src={`https://robohash.org/${id}`} alt="robot" />
         <h2>{name}</h2>
         {/* 通过useContext，直接使用value */}
      <p>作者：{value.userName}</p>
      <button onClick={addToCart}>加入购物车</button>
    </div> //     
  )
}

export default Robot