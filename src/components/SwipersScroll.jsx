import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import NoBackdropPathImage from '../assets/noimage-still_path.jpg'

register();

export const InitSwiper = ({data, type}) => {
  const swiperElRef = useRef(null);

  return (
    <div className="swiper-container">
    <swiper-container 
      ref={swiperElRef}
      slides-per-view="6"
      space-between="10"
      navigation="true"
    >
      {data.map((content) => (

        <div className="swiper-slide" key={content.id}>
          <swiper-slide> 
            <Link className='link-class' to={`/${(type === 'movie') ? `movie-details` : `tv-details`}?id=${content.id}`}>
              {content.backdrop_path
              ? 
              <img 
              src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`} 
              alt={(type === 'movie') ? content.title : content.name}
              className="swiper-slide-img" />
              :
              <img src={NoBackdropPathImage} 
              alt={(type === 'movie') ? content.title : content.name}
              className="swiper-slide-img" />
              }

              <h4 className="title">
                {(type === 'movie') ? content.title : content.name}
              </h4>

              <h4 className="swiper-genre">
                <i className="fas fa-star text-secondary"></i> {content.vote_average.toFixed(1)} / 10
              </h4>
              </Link>
          </swiper-slide>
        </div>

      ))}
      
    </swiper-container>
    </div>
  );
 
};

export default InitSwiper