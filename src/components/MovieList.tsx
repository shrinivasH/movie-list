
import { useState, useRef, useCallback } from 'react'
import MovieTile from './MovieTile';
import useMovies from '../hooks/useMovies';
const MovieList =()=>{
    const [pageNum, setPageNum] = useState(1)
    
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = useMovies(pageNum,"2012")
    const intObserver:any = useRef()
    const lastPostRef = useCallback((post:any) => {
        if (isLoading) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && hasNextPage) {
                console.log('We are near the last post!')
                //2012 ,2013
                setPageNum(prev => prev + 1)
            }
        })

        if (post) intObserver.current.observe(post)
    }, [isLoading, hasNextPage])
    /* Error handling */    
    if (isError) return <p className='center'>Error message</p>
    
    const content = results.map((post:any, i) => {
        if (results.length === i + 1) {
            return <MovieTile ref={lastPostRef} key={post.id} movie={post} />
        }
        return <MovieTile key={post.id} movie={post} />
    })

     
    return(<>
             MovieList From Fragment
             {content}
    </>)
}
export default MovieList