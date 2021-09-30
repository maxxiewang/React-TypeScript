/* 创建全局state和上下文关系组件contextComponent*/
import React ,{useState}from "react";

interface AppStateValue{
  userName:string;
  shoppinCart:{ items:{
    id:number,
    name:string,
  }[]} // 直接这样定义表示数组
}

const defaultContextVal:AppStateValue = {
  userName:'lily',
  shoppinCart:{
    items:[]
  }
}

export const appContext = React.createContext(defaultContextVal)
export const appSetStateContext = React.createContext<
  React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined);

// 这个AppStateProvider组件，就是包裹App组件Provider
// 这个Provider就是一个高阶函数HOC，功能就是把它所有的子组件包裹起来，并从全局的角度来提供数据的支持
// 所以retrun一个包裹child组件provider
export const AppStateProvider: React.FC = (props)=>{
  // 注意这是个二元数组
  const [state,setState] = useState(defaultContextVal) 
  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>
         {props.children}
      </appSetStateContext.Provider>
    </appContext.Provider>
  )
}

