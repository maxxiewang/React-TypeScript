import { useState, useEffect } from 'react'

/* 
  当两个函数共享一个逻辑，函数内部也可以调用其他的hook
*/

const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })
  useEffect(() => {
    console.log('添加一个effect,mouseMove')
    const updateMouse = (e: MouseEvent) => {
      setPositions({
        x: e.clientX,
        y: e.clientY,
      })
    }
    document.addEventListener('mousemove', updateMouse)
    // 此时并没有return那个函数，清除到MouseMove事件
  }, [])

  return positions
}

export default useMousePosition
