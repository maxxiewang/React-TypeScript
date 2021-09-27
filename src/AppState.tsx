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

// 创建Context组件，就是包裹App组件Provider
// 这个Provider就是一个高阶函数HOC
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

