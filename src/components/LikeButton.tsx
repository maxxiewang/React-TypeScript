import React, { useState, useEffect } from 'react'
import useMousePosition from '../hooks/useMousePosition'

const LikeButton: React.FC = () => {
  const [obj, setObj] = useState({ like: 0, on: true })
  const [switchSts, setSwitchSus] = useState(true)
  const positions = useMousePosition()
  useEffect(() => {
    document.title = `EFF ${obj.like}！`
  })
  const aaClick = () => {
    //! 在hook里面，state是替换，而不是像setState那种合并，只改like的值是不可以的
    setObj({
      like: obj.like + 1,
      on: obj.on,
    })
  }
  // return <button onClick={() => setLike(like + 1)}>√ Like{like}</button>
  return (
    <>
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
      <h3>
        x:{positions.x},y:{positions.y}
      </h3>
    </>
  )
}

export default LikeButton
