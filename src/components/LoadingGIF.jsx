import LoadingGif from '../assets/cinemaplusloading.gif'

function LoadingGIF() {
  return (
    <div className='loading'>
        <img src={LoadingGif} alt="Loading..." className='loadingImg' />
    </div>
  )
}

export default LoadingGIF