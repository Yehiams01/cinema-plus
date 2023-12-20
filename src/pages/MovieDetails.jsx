import React, { useEffect, useContext, useState } from "react"
import { useSearchParams } from "react-router-dom";
import LoadingGIF from "../components/LoadingGIF"
import TMDBContext from "../context/TMDBContext/TMDBContext"
import InitSwiper from "../components/SwipersScroll";
import Modal from 'react-modal';
import goBackSymbol from '../assets/goBackSymbol.png'

function MovieDetails() {
    const [searchParams] = useSearchParams();
    const contentId = searchParams.get('id');
    const {fetchMovieDetails, movieDetails, loading, similarMovies, fetchSimilarMovies, fetchMovieTrailer, movieTrailer} = useContext(TMDBContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
      fetchMovieDetails(contentId)
      fetchSimilarMovies(contentId)
      fetchMovieTrailer(contentId)

    }, [contentId])

    useEffect(() => {
        document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), #1b1b1b), url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`;
        document.body.style.backgroundSize = 'contain';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundSize = '100vw 98vh';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundColor = '#1b1b1b';
    })
  
    if(!loading) {
      return (
        <>
        <div class="details-top">

        <div>
          {movieDetails.poster_path ? 
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            class="card-img-top"
            alt="${movieDetails.title}"
          />
           : <img
           src="./img/noimage.jpg"
           class="card-img-top"
           alt="${movieDetails.title}"
         />
          }
        </div>
        <div>
            <h2>{movieDetails.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              {movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A'} / 10
            </p>
            <p class="text-muted">Release Date: {movieDetails.release_date}</p>
            <p>
              {movieDetails.overview}
            </p>
            <h5>Genres</h5>
            <ul className="list-group">
            {movieDetails.genres && movieDetails.genres.map((genre, index) => (
            <li key={index}>{genre.name}</li>
            ))}
            </ul>
            
            {/* Trailer Modal: */}
            {movieTrailer.filter(item => item.type === 'Trailer' && item.site === 'YouTube' )[0] ? 
            (
              <div id="trailer-show">
                <button className="trailerButton" onClick={() => setModalIsOpen(true)}>Watch Trailer</button>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className ="myModal" overlayClassName="myOverlay">
                <div className="trailer">
                  <button className="btn-go-back" onClick={() => setModalIsOpen(false)}><img src={goBackSymbol} alt="" /></button>
                    <iframe 
                      className="embedTrailer" 
                      src={`https://www.youtube.com/embed/${movieTrailer.filter(item => item.type === 'Trailer' && item.site === 'YouTube' )[0].key}`} 
                      title="Trailer" 
                      frameBorder="0"
                      />
                </div>
                </Modal>
              </div>
              )
              : ''
            }   
            
          </div>
          </div>
        

              <section className="similar centered-swiper">
                <h2>Similar Movies</h2>
                <InitSwiper data={similarMovies} type='movie' />
              </section>
      </>
            
      )
    } else {
      return <LoadingGIF />
    }
}

export default MovieDetails