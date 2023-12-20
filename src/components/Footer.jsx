import TMDBLogo from '../assets/themoviedb.svg'
import Logo from '../assets/cinemapluslogo.png'

function Footer() {
    const footerYear = new Date().getFullYear()

  return (
        <footer className="footer">
            <div className="footerContainer">  
                <div className="siteLinks">
                    <h3>Site Links</h3>
                    <ul>
                        <li><a href="#">Help & Support</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className="copyrights">
                    <p>All the data on Cienma+ is provided by TMDB API.</p>
                    <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                    <img src={TMDBLogo} alt="logo" />
                    <p>Copyright &copy; {footerYear}, All Rights Reserved - Yehiam Shealtiel.</p>

                </div>

                <div className="socials">
                    <img src={Logo} alt="logo" / >
                    <ul>
                        <li><i className="fa fa-facebook fa-2x text-secondary"></i></li>
                        <li><i className="fa fa-instagram fa-2x text-secondary"></i></li>
                        <li><i className="fa fa-twitter fa-2x text-secondary"></i></li>
                        <li><i className="fa fa-linkedin fa-2x text-secondary"></i></li>
                    </ul>
                </div>
        </div>
    </footer>
  )
}

export default Footer