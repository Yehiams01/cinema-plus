import { useEffect, useContext } from "react"
import LoadingGIF from "../components/LoadingGIF"
import InitSwiper from '../components/SwipersScroll'
import TMDBContext from "../context/TMDBContext/TMDBContext"
import theLastOfUsImage from '../assets/thelastofus.jpeg';
import Footer from "../components/Footer";


function Home() {
  const {trendingMovies, trendingTV, loading, fetchTrending, fetchTrendingTV, topRatedMovies, fetchTopRatedMovies, topRatedTV, fetchTopRatedTV} = useContext(TMDBContext)
  

  useEffect(() => {
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.3), #1b1b1b), url(${theLastOfUsImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = '100vw 98vh';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundColor = '#1b1b1b';

    fetchTrending()
    fetchTrendingTV()
    fetchTopRatedMovies()
    fetchTopRatedTV()
  }, [])




  
  if(!loading) {
    return (
    <div className="homePage">
      {/* <div className="backgroundFill"> */}
      <div className="welcomeSection">
        <h1 className="welcomeTitle">Welcome</h1>
        <h3 className="welcomeInfo">All your movies and tv reccomendations in one place.</h3>
          <section className="search">
            <div className="search-flex">
                <form action="/search" className="search-form">
                  <input type="text" className="search-term" placeholder="Search for a movie or a tv show..." />
                  <button className="btn-search" type="submit"><i className="fas fa-search"></i></button>
                </form>
            </div>
          </section>
      </div>

        <h2 className="sectionTitle">Trending - Movies</h2>
        <InitSwiper data={trendingMovies} type={'movie'} />
        <h2 className="sectionTitle">Trending - Shows</h2>
        <InitSwiper data={trendingTV} type='tv' />

        <section className="meet-discover">
          <div>
              <h1>MEET</h1>
              <h1>DISCOVER</h1>
              <button className="meet-discover-btn"><a href="discover.html">Try Now</a></button>
          </div>
          <img src='' alt="" />
        </section>

        <h2 className="sectionTitle">Top Rated - Movies</h2>
        <InitSwiper data={topRatedMovies} type='movie' />
        <h2 className="sectionTitle">Top Rated - TV Shows</h2>
        <InitSwiper data={topRatedTV} type='tv' />
        {/* </div> */}
        <Footer />
    </div>
    
    )
  } else {
    return <LoadingGIF />
  }
  
}

export default Home