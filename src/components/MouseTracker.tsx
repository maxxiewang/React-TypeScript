import React, { useState, useEffect } from 'react'

const MouseTracker: React.FC = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })
  useEffect(() => {
    console.log('add effect', positions.x)
    const updateMouse = (e: MouseEvent) => {
      // console.log('鼠标的坐标为', e.clientX, e.clientY)
      setPositions({
        x: e.clientX,
        y: e.clientY,
      })
    }
    //! 这就是一个夺命连环call，每次更新都会添加click事件，越来越多，但并没有清除它
    document.addEventListener('click', updateMouse)
    //! 通过return一个函数，手动清除这个事件监听。 在组件卸载时，也会执行此逻辑
    return () => {
      console.log('remove effect', positions.x)
      document.removeEventListener('click', updateMouse)
    }
  }, []) //!这里面的空数组和上面return一个函数进行比较
  console.log('before render', positions.x)
  return (
    <>
      <p
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: 20,
          color: 'orangered',
        }}
      >
        X:{positions.x},Y:{positions.y}
      </p>
    </>
  )
}

export default MouseTracker
