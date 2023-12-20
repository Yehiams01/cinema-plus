const TMDBReducer = (state, action) => {
    switch(action.type) {
        case 'SEARCH_MOVIES_AND_TV':
            return {
                ...state,
                searchResults: action.payload,
                loading: false,
            }

        case 'GET_TRENDING_MOVIES':
            return {
                ...state, 
                trendingMovies: action.payload,
                loading: false,
            };
        case 'GET_TRENDING_TV':
            return {
                ...state, 
                trendingTV: action.payload,
                loading: false,
            };
        case 'GET_TOP_RATED_MOVIES':
            return {
                ...state,
                topRatedMovies: action.payload,
                loading:false,
            }
        case 'GET_TOP_RATED_TV':
            return {
                ...state,
                topRatedTV: action.payload,
                loading:false,
            }
        case 'GET_MOVIE_DETAILS':
            return {
                ...state,
                movieDetails: action.payload,
                loading: false,
            }
        case 'GET_SIMILAR_MOVIES':
            return {
                ...state,
                similarMovies: action.payload,
                loading: false,
            }
        case 'GET_SHOW_DETAILS':
            return {
                ...state,
                showDetails: action.payload,
                loading: false,
            }

        case 'GET_MOVIE_TRAILER':
            return {
                ...state,
                movieTrailer: action.payload,
                loading: false,
            }
        case 'GET_DISCOVER_RESULTS':
            return {
                ...state,
                discoverResults: action.payload,
                loading: false,
            }
        case 'GET_CONTENT_IMAGES':
            return {
                ...state,
                contentImages: action.payload,
                loading: false,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state
    };
}

export default TMDBReducer