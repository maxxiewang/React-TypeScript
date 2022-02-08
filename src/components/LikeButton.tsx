import React, { useState, useEffect, useRef } from 'react'
import useMousePosition from '../hooks/useMousePosition'

const LikeButton: React.FC = () => {
  const [obj, setObj] = useState({ like: 0, on: true })
  const [switchSts, setSwitchSus] = useState(true)
  const positions = useMousePosition()
  const likeRef = useRef(0)
  const didMountRef = useRef(false)
  const domRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    document.title = `EFF ${obj.like}！`
  })
  const aaClick = () => {
    //! 在hook里面，state是替换，而不是像setState那种合并，只改like的值是不可以的
    setObj({
      like: obj.like + 1,
      on: obj.on,
    })
    likeRef.current++
  }
  // return <button onClick={() => setLike(like + 1)}>√ Like{like}</button>
  const handleClick = () => {
    setTimeout(() => {
      // alert(`点击了${obj.like}次`)
      alert(`点击了${likeRef.current}次`)
    }, 2000)
  }
  //! 模拟compondentDidMount
  useEffect(() => {
    if (didMountRef.current) {
      console.log('this is updated')
    } else {
      didMountRef.current = true
    }
  })

  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus()
    }
  })
  return (
    <>
      <input type="text" ref={domRef} />
      <button onClick={aaClick}>√ Like{obj.like}</button>
      <button
        onClick={() => {
          setObj({ like: obj.like, on: !obj.on })
        }}
      >
        {obj.on ? 'ON' : 'OFF'}
      </button>
      <button
        onClick={() => {
          setSwitchSus(!switchSts)
        }}
      >
        {switchSts ? '工作中' : '停车'}
      </button>
      <button onClick={handleClick}>点击了？次</button>
      <h3>
        x:{positions.x},y:{positions.y}
      </h3>
    </>
  )
}

export default LikeButton
