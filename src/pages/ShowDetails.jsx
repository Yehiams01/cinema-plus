import { useEffect, useContext } from "react"
import { useSearchParams } from "react-router-dom";
import LoadingGIF from "../components/LoadingGIF"
import TMDBContext from "../context/TMDBContext/TMDBContext"
import InitSwiper from "../components/SwipersScroll";

function ShowDetails() {
    const [searchParams] = useSearchParams();
    const contentId = searchParams.get('id');
    const {fetchShowDetails, showDetails, loading} = useContext(TMDBContext)

    useEffect(() => {
      fetchShowDetails(contentId)
      
    }, [contentId])

    useEffect(() => {
      document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), #1b1b1b), url(https://image.tmdb.org/t/p/original/${showDetails.backdrop_path})`;
      document.body.style.backgroundSize = 'contain';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundSize = '100vw 98vh';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundColor = '#1b1b1b';
    })
  
    console.log(showDetails)

    if(!loading) {
      return (
        <>
        <div className="details-top details-show">

        <div>
          {showDetails.poster_path ? 
          <img
            src={`https://image.tmdb.org/t/p/w500${showDetails.poster_path}`}
            className="card-img-top"
            alt="${showDetails.title}"
          />
           : <img
           src="./img/noimage.jpg"
           className="card-img-top"
           alt="${showDetails.title}"
         />
          }
        </div>
        <div>
            <h2>{showDetails.name}</h2>
            <p>
              <i className="fas fa-star text-primary"></i>
              {showDetails.vote_average ? showDetails.vote_average.toFixed(1) : 'N/A'} / 10
            </p>
            <p className="text-muted">Release Date: {showDetails.first_air_date}</p>
            <p>
              {showDetails.overview}
            </p>
            <h5>Genres</h5>
            <ul className="list-group">
            {showDetails.genres && showDetails.genres.map((genre, index) => (
            <li key={index}>{genre.name}</li>
            ))}
            </ul>
            <div id="trailer-show"></div>
          </div>
          </div>

            </>
            
      )
    } else {
      return <LoadingGIF />
    }
}

export default ShowDetails