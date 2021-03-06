import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import Robot from './components/Robots'
import logo from './assets/images/logo.svg'
import ShoppingCart from './components/ShoppingCart'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import useMousePosition from './hooks/useMousePosition'
// import { LikeButton } from './components/LikeButton'
// import LikeButton from './components/LikeButton.tsx'
import withLoader from './components/withLoader'
import useURLLoader from './hooks/useURLLoader'

interface IShowResult {
  message: string
  status: string
}

//* 演示useContext
interface IThemeProps {
  [key: string]: { color: string; background: string }
}

const themes: IThemeProps = {
  light: {
    color: '#000',
    background: '#eee',
  },
  dark: {
    color: '#f4f4f4',
    background: '#222',
  },
}

//! useContext案例
export const ThemeContext = React.createContext(themes.light)

const DogShow: React.FC<{ data: IShowResult }> = ({ data }) => {
  return (
    <>
      <h2>Dog show:{data.status}</h2>
      <img src={data.message} />
    </>
  )
}

interface Props {
  // userName:string
}
/* 
  useEffect，副作用函数Side-effect  输入参数一样，而输出结果不确定的情况就是副作用
  在使用React时，经常用useEffect，比如通过API获取数据，处理事件订阅等。
  简单来说，APP就是通过副作用与外界产生交流和互动的。(在无法使用生命周期的函数式组件)
*/

const App: React.FC<Props> = (props) => {
  // 实际上这个数组第一个元素就是state的getter，第二个就是state的setter
  const [count, setCount] = useState<number>(0) //count状态的初始化值，即0
  const [robotGallery, setRobotGallery] = useState<any>([]) //初始化为一个空数组
  const [loading, setLoading] = useState<boolean>(false) // 初始化值，false
  const [error, setError] = useState<string>('')
  const [show, setShow] = useState<boolean>(true)
  //! 使用自定义hook
  const positions = useMousePosition()
  const [data, loadding] = useURLLoader(
    'https://dog.ceo/api/breeds/image/random',
    [show]
  )
  const dogResult = data as IShowResult
  // console.log('dogResult', dogResult)
  //! hoc函数组件
  // const DogShowtime = withLoader(
  //   DogShow,
  //   'https://dog.ceo/api/breeds/image/random'
  // )
  // console.log('DogShowtime', DogShowtime)
  // setCount是异步的，而且没有重载，不能提供回调接口
  // 那么如何处理异步逻辑呢，一般不需要处理，如果需的话就进入副作用钩子
  /* 
    默认情况下，每下UI渲染或状态改变的时候，useEffect函数都会执行，但默认情况下的默作用非常消耗资源，应该选择适当的时机。
    第二个参数是数组，数组内是组件的状态列表，如果这个状态列表不为空，useEffect会盯住这个列表内的状态，
    一定是列表内状态发生了变化，useEffect才会被执行
    如果第二个参数传入了一个空数组，就类似于componetDidMount，只会在页面初次渲染时调用。
  */
  useEffect(() => {
    document.title = `点击了${count}次`
  }, [count])

  // useEffect(()=>{
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((data) => setRobotGallery(data));
  // },[]) // 注意这个空数组

  // 如何在副作用函数中使用asnyc await，useEffect不支持关键词async
  // 如何处理异常
  // 1、useEffect要么返回一个函数，要么什么都不返回。2、不支持关键词async，因为async返回一个promise.
  // 所以useEffect用asnyc修饰后，返回的promise即不是函数也不是null，所以会报错。
  useEffect(() => {
    const fetchData = async () => {
      console.log('页面更新，执行useEffect')
      setLoading(true)
      try {
        const responses = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        // .then(response => response.json())
        // .then(data => setRobotGallery(data))
        const data = await responses.json()
        setRobotGallery(data)
      } catch (e: any) {
        console.log('e.message', e.message)
        setError(e.message)
      }
      setLoading(false)
    }
    fetchData()
  }, []) // 注意这个空数组
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} alt="logo" className={styles.appLogo} />
        <h1>CyberPunk机器人Inc</h1>
      </div>
      {/* <h2>{props.userName}</h2> */}

      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        计数器
      </button>
      <LikeButton />
      <p>
        <button
          onClick={() => {
            setShow(!show)
          }}
        >
          改变show状态
        </button>
      </p>
      {loadding ? (
        <p>狗狗读取中</p>
      ) : (
        <img src={dogResult && dogResult.message} />
      )}
      {show && <MouseTracker />}

      <span>count:{count}</span>
      <p
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 20,
          color: 'black',
        }}
      >
        X:{positions.x},Y:{positions.y}
      </p>
      {/* HOC组件实现 */}
      {/* <DogShowtime /> */}
      <ShoppingCart />
      {(error || error !== '') && <div>网站出错：{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r) => {
            return <Robot id={r.id} email={r.email} name={r.name} key={r.id} />
          })}
        </div>
      ) : (
        <h2>loading 加载中</h2>
      )}
    </div>
  )
}

export default App
