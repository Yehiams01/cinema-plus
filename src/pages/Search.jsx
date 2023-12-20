import React, { useState, useContext } from 'react';
import InitSwiper from '../components/SwipersScroll';
import TMDBContext from '../context/TMDBContext/TMDBContext';
import { toast } from 'react-toastify'
import NoImage from '../assets/noimage-still_path.jpg'


function Search() {
    const tmdbContext = useContext(TMDBContext)

    const { loading, searchResults, searchFunction } = useContext(TMDBContext)

    const [text, setText] = useState('');

    const onSubmit = e => {
      e.preventDefault();
      if (text === '') {
        toast.error('Please enter a search term')
      } else {
        searchFunction(text);
        setText('');
      }
    };

    const onChange = e => setText(e.target.value);
  
  return  (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          
        />
      </form>

      <div className="search-results">
      {searchResults.map(result => (
        <div className="card">
            <a href={`${result.media_type}-details?id=${result.id}`}>
        {
            result.backdrop_path
            ? <img
            src={`https://image.tmdb.org/t/p/w300${result.backdrop_path}`}
            class="card-img-top"
            alt={`${(result.media_type === 'movie') ? result.title : result.name}`}
          />
           : <img
           src={NoImage}
           class="card-img-top"
           alt={`${(result.media_type === 'movie') ? result.title : result.name}`}
         />
          }
      </a>
      <h4 class="title">{(result.media_type === 'movie') ? result.title : result.name}</h4>
      {/* <h4 class="swiper-genre">
            <i class="fas fa-star text-secondary"></i> {result.vote_average.toFixed(1)} / 10
      </h4> */}
        </div>
      )) }
    </div>
    </div>
  )
}

export default Search