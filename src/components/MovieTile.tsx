import React from "react"

const MovieTile=React.forwardRef(({movie}:any , ref)=>{
    const postBody = (<h2>{movie?.title}</h2>)

    const content = ref
        ? <article ref={ref as React.RefObject<HTMLDivElement>}>{postBody}</article>
        : <article>{postBody}</article>

    return content
})
export default MovieTile