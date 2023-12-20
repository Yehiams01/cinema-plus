import React, { useState, useContext, useEffect, useRef } from 'react';
import TMDBContext from "../context/TMDBContext/TMDBContext";
import 'swiper/css';
import { Link } from 'react-router-dom';
import NoBackdropPathImage from '../assets/noimage-still_path.jpg';
import { register } from 'swiper/element/bundle';

register();

function DiscoverResults( {discoverResults, answers} ) {
    const swiperElRef = useRef(null);
    const { fetchContentImages, contentImages } = useContext(TMDBContext);
    const [contents, setContents] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);
    const [modalBackground, setModalBackground] = useState(null);


    useEffect(() => {
        if (discoverResults.length > 0) {
            const fetchImages = async () => {
                const moviesWithImages = await Promise.all(discoverResults.map(async (content) => {
                    console.log(answers.type)
                    try {
                        const images = await fetchContentImages(content.id, answers.type);
                        console.log(images); // Now this should log the fetched images
                        return { ...content, logoUrl: images };
                    } catch (error) {
                        console.error('Error fetching images for content:', content.id, error);
                        return content;
                    }
                }));
    
                setContents(moviesWithImages);
                console.log(moviesWithImages);
                if (moviesWithImages.length > 0) {
                    setSelectedContent(moviesWithImages[0]);
                }
            };
    
            fetchImages();
        }
    }, [discoverResults]);


    const handleHover = (content) => {
        setSelectedContent(content);
        setModalBackground(content.backdrop_path);
    };

    const type = 'movie';
    console.log(selectedContent)

    return (
        <>
            <div className="modalBackground" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5), #000), url(https://image.tmdb.org/t/p/w1280/${modalBackground})` }}>
             <div className="movie-details">
                {selectedContent && (
                    <>
                        <img className='contentLogo' src={`https://image.tmdb.org/t/p/w500/${selectedContent.logoUrl}`} alt={selectedContent.name} />
                        <p className='contentPlot'>{selectedContent.overview}</p>

                        {/* Adding the genres list */}

                        {/* {document.querySelector('.movie-details').style.background =  `url(https://image.tmdb.org/t/p/original/${selectedContent.backdrop_path})`} */}
                    </>
                )}
            </div>

            <div className="swiper-container discover-swiper">
                <swiper-container
                    ref={swiperElRef}
                   slides-per-view="6"
                   space-between="10"
                   navigation="true"
                >
                    {contents.map((content) => (
                        <div className="swiper-slide"  key={content.id} onMouseEnter={() => handleHover(content)}>
                        <swiper-slide> 
                            <Link className='link-class' to={`/${answers.type === 'movie' ? 'movie-details' : 'tv-details'}?id=${content.id}`}>
                                {content.backdrop_path ? 
                                    <img 
                                        src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`} 
                                        alt={type === 'content' ? content.title : content.name}
                                        className="swiper-slide-img" 
                                    /> :
                                    <img 
                                        src={NoBackdropPathImage} 
                                        alt={type === 'content' ? content.title : content.name}
                                        className="swiper-slide-img" 
                                    />
                                }
                                <h4 className="title">
                                    {type === 'content' ? content.title : content.name}
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
            </div>
        </>
    );
}

export default DiscoverResults;
