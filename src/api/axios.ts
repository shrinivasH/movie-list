import axios from "axios";
export const api= axios.create({
    baseURL:"https://api.themoviedb.org/3/discover"
})
export const getMovieList = async (release_year="2023",pageParam = 1,vote_count=100, options = {}) => {
    const response = await api.get(`movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${release_year}&page=${pageParam}&vote_count.gte=${vote_count}`, options)
    console.log("Response",response.data)
    return response.data.results
}