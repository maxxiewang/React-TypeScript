import React from 'react'
import styles from './Robot.module.css'
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
  return (
    <div className={styles.cardContainer}>
      <img src={`https://robohash.org/${id}`} alt="robot" />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  )
}

export default Robot