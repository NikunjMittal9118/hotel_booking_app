import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  console.log("I am rendered")
  useEffect(() => {
    console.log("I am in useEffect")
    const fetchData = async () =>  {
      console.log("before setLoading 1")
      setLoading(prev => true)
      console.log("after setLoading 2")
      try {
        const res = await axios.get(url)
        console.log("before setData 1")
        setData(prev => res.data)
        console.log("after setData 1")
      } catch (err) {
        setError(err)
      }
      console.log("before setLoading 2")
      setLoading(prev => false)
      console.log("after setLoading 2")
    }
    fetchData()
  }, [url])

  const reFetch = async (url) => {
    setLoading(true)
    try {
      const res = await axios.get(url)
      setData(res.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  return { data, loading, error, reFetch }
}

export default useFetch