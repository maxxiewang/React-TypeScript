/* 创建全局state和上下文关系组件contextComponent*/
import React ,{useState}from "react";

interface AppStateValue{
  userName:string;
  shoppingCart:{ items:{
    id:number,
    name:string,
  }[]} // 直接这样定义表示数组
}

const defaultContextVal:AppStateValue = {
  userName:'lily',
  shoppingCart:{
    items:[]
  }
}
// 创建上下文关系对象，使用React内建函数createContext(API要求必须给定默认的初始值)
export const appContext = React.createContext(defaultContextVal)
// 由于全局状态state的更新，为了能共享setState钩子，需要创建新的context来连接这个setState函数
// 由于初始化的是一个函数，所以可传一个undefined作为初始化的值
export const appSetStateContext = React.createContext<
  React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined);

// 这个AppStateProvider组件，就是包裹App组件Provider
// 这个Provider就是一个高阶函数HOC，功能就是把它所有的子组件包裹起来，并从全局的角度来提供数据的支持
/* 
  所以retrun一个包裹child组件provider，和App.tsx有关系
  App.tsx中直接全局注册，并在根组件导入
  import {AppStateProvider} from './AppState'
*/
export const AppStateProvider: React.FC = (props)=>{
  // 注意这是个二元数组，第二个是state的更新函数，这是hooks的标准
  // 而这个元组的两个元素，第一个就是state的getter，第二个就是state的setter
  const [state,setState] = useState(defaultContextVal) 
  return (
    // 为了使用数据，必须使用Provider包裹起来，并将数据注入到value属性中
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
         {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}

