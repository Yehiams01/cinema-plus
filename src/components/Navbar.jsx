import { useNavigate, useLocation } from "react-router-dom"
import Logo from '../assets/cinemaplus.gif'

function Navbar({ onDiscoverClick }) {
    const navigate = useNavigate()
    const location = useLocation()
    

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        } 
    }

  return (
    <header className="navbar">
        <nav className="navbarNav">
            <img src={Logo} alt="logo" className="logo" />

            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate
                    ('/')}>
                    <p className={pathMatchRoute('/') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}
                    >
                        Home
                    </p>
                </li>

                {/* To add - movies and shows page link */}
                {/* <li className="navbarListItem" onClick={() => navigate
                    ('/movies')}>
                    <p className={pathMatchRoute('/movies') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}
                    >
                        Movies
                    </p>
                </li>
                <li className="navbarListItem" onClick={() => navigate
                    ('/shows')}>
                    <p className={pathMatchRoute('/shows') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}
                    >
                        Shows
                    </p>
                </li> */}
                <li className="navbarListItem" onClick={onDiscoverClick}>
                    <p className={pathMatchRoute('/discover') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}
                    >
                        Discover
                    </p>
                </li>

                <li className="navbarListItem" onClick={() => navigate
                    ('/profile')}>
                    <p className={pathMatchRoute('/profile') 
                    ? 'navbarListItemNameActive' 
                    : 'navbarListItemName'}
                    >
                        Profile
                    </p>
                </li>

            </ul>
        </nav>
    </header>
  )
}

export default Navbar