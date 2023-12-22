import { useState, useEffect } from 'react'
import {getMovieList} from "../api/axios"
const useMovies=(pageNum = 1,year="2012")=>{
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    const [hasNextPage, setHasNextPage] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getMovieList(year, pageNum,100, { signal })
            .then((data:any) => {
                // @ts-ignore 
                setResults(prev => [...prev, ...data])
                setHasNextPage(Boolean(data.length))
                setIsLoading(false)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.message })
            })

        return () => controller.abort()

    }, [pageNum,year])

    return { isLoading, isError, error, results, hasNextPage }
}
export default useMovies