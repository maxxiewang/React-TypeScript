import { useState, useEffect } from 'react'
import axios from 'axios'

//! deps表示什么情况下要重新触发加载
const useURLLoader = (url: string, deps: any[] = []) => {
  //! 加一个范型<any> 避免data为null类型
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(url).then((res) => {
      setData(res.data)
      setLoading(false)
    })
  }, deps) //! 通过这个deps判断是否重新加载
  //! 最后把想要的东西导出去
  return [data, loading]
}

export default useURLLoader
