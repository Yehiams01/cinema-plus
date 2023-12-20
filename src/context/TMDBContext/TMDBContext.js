import { createContext, useReducer } from "react";
import TMDBReducer from "./TMDBReducer";

const TMDBContext = createContext()

const API_URL = process.env.REACT_APP_API_URL
const API_TOKEN = process.env.REACT_APP_API_TOKEN

export const TMDBProvider = ({children}) => {
    const initialState = {
        searchResults: [],
        trendingMovies: [],
        trendingTV: [],
        topRatedMovies: [],
        topRatedTV: [],
        movieDetails: [],
        showDetails: [], 
        similarMovies: [],
        movieTrailer: [],
        discoverResults: [],
        contentImages: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(TMDBReducer, initialState)

    const searchFunction = async(text) => {
      setLoading()

      console.log('1')

      const response = await fetch(`${API_URL}search/multi?language=en-US&query=${text}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: API_TOKEN
        }
      })
  
      const data = await response.json()
      console.log(data)
  
      dispatch({
          type: 'SEARCH_MOVIES_AND_TV',
          payload: data.results,
      })

    }

    const fetchTrending = async() => {
        setLoading()
        const response = await fetch(`${API_URL}trending/movie/week?language=en-US`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })
    
        const data = await response.json()
        console.log(data.results)
    
        dispatch({
            type: 'GET_TRENDING_MOVIES',
            payload: data.results,
        })

      }

      const fetchTrendingTV = async() => {
        setLoading()
        const response = await fetch(`${API_URL}trending/tv/week?language=en-US`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })
    
        const data = await response.json()
    
        dispatch({
            type: 'GET_TRENDING_TV',
            payload: data.results,
        })

      }

      const fetchTopRatedMovies = async() => {
        setLoading()
        const response = await fetch(`${API_URL}movie/top_rated?language=en-US`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })
    
        const data = await response.json()

        console.log(data)
    
        dispatch({
            type: 'GET_TOP_RATED_MOVIES',
            payload: data.results,
        })

      }

      const fetchTopRatedTV = async() => {
        setLoading()
        const response = await fetch(`${API_URL}tv/top_rated?language=en-US`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })
    
        const data = await response.json()

        console.log(data)
    
        dispatch({
            type: 'GET_TOP_RATED_TV',
            payload: data.results,
        })

      }

      const fetchMovieDetails = async(contentId) => {
        setLoading()
        const response = await fetch(`${API_URL}movie/${contentId}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })
    
        const data = await response.json()

    
        dispatch({
            type: 'GET_MOVIE_DETAILS',
            payload: data,
        })

      }

      const fetchShowDetails = async(contentId) => {
        setLoading()
        const response = await fetch(`${API_URL}tv/${contentId}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })
    
        const data = await response.json()

    
        dispatch({
            type: 'GET_SHOW_DETAILS',
            payload: data,
        })

      }

      const fetchSimilarMovies = async(contentId) => {
        setLoading()
        const response = await fetch(`${API_URL}movie/${contentId}/similar`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })

        
    
        const data = await response.json()

    
        dispatch({
            type: 'GET_SIMILAR_MOVIES',
            payload: data.results,
        })

      }

      const fetchMovieTrailer = async(contentId) => {
        setLoading()
        const response = await fetch(`${API_URL}movie/${contentId}/videos`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })

        
    
        const data = await response.json()

    
        dispatch({
            type: 'GET_MOVIE_TRAILER',
            payload: data.results,
        })

      }

      const fetchDiscoverResults = async(answers) => {
        setLoading()
        const response = await fetch(`${API_URL}discover/${answers.type}?include_adult=true&include_video=false&page=1&${answers.type === 'movie' ? 'primary_release_date' : 'first_air_date'}.gte=${answers.year}&sort_by=popularity.desc&with_genres=${answers.genres}&vote_count.gte=500&vote_average.gte=7`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN
          }
        })
    
        const data = await response.json()

        console.log(data.results)
        dispatch({
            type: 'GET_DISCOVER_RESULTS',
            payload: data.results.slice(0,10),
        })

      }

      // const fetchContentImages= async(id) => {
      //   setLoading()
      //   const response = await fetch(`${API_URL}movie/${id}/images`, {
      //     method: 'GET',
      //     headers: {
      //       accept: 'application/json',
      //       Authorization: API_TOKEN
      //     }
      //   })
    
      //   const data = await response.json()
      //   // console.log(data.logos.filter(item => (item.iso_639_1 === 'en'))[0].file_path)
      //   console.log(data.logos[0].file_path)
    
      //   dispatch({
      //       type: 'GET_CONTENT_IMAGES',
      //       payload: data.logos[0].file_path,
      //   })

      // }


      const fetchContentImages = async (id, type) => {
        setLoading();
        try {
            const response = await fetch(`${API_URL}${type}/${id}/images`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: API_TOKEN
                }
            });
    
            const data = await response.json();
            console.log("Fetched image data:", data); // Check the whole response
    
            const imagePath = data.logos.filter(item => item.iso_639_1 === 'en')[0]?.file_path || '';
            console.log("Image path:", imagePath); // Check the extracted path
    
            dispatch({
                type: 'GET_CONTENT_IMAGES',
                payload: imagePath,
            });
    
            return imagePath; // Return the image path
        } catch (error) {
            console.error("Error fetching content images for ID", id, error);
            return '';
        }
    };

      const setLoading = () => { dispatch({type: 'SET_LOADING'})}

      return (
        <TMDBContext.Provider 
            value = {{
                searchResults: state.searchResults,
                trendingMovies: state.trendingMovies, 
                trendingTV: state.trendingTV,
                topRatedMovies: state.topRatedMovies,
                topRatedTV: state.topRatedTV,
                loading: state.loading, 
                movieDetails: state.movieDetails,
                showDetails: state.showDetails,
                similarMovies: state.similarMovies,
                movieTrailer: state.movieTrailer,
                discoverResults: state.discoverResults,
                contentImages: state.contentImages,
                searchFunction,
                fetchTrending,
                fetchTrendingTV,
                fetchTopRatedMovies,
                fetchTopRatedTV,
                fetchMovieDetails,
                fetchShowDetails,
                fetchSimilarMovies,
                fetchMovieTrailer,
                fetchDiscoverResults,
                fetchContentImages}}>
            {children}
        </TMDBContext.Provider>
      )
}

export default TMDBContext