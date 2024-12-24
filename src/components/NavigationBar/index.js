import './index.css'
import {Link} from 'react-router-dom'
import {
  AiFillHome,
  AiTwotoneFire,
  GiGamepad,
  MdPlaylistAdd,
} from 'react-icons/all'

const NavigationBar = () => (
  <nav className="navigation-bar">
    <div className="menu-container">
      <ul className="menu-list">
        <Link to="/" className="menu-link">
          <li className="menu-item">
            <AiFillHome className="menu-icon" color="red" />
            <span className="menu-text">Home</span>
          </li>
        </Link>
        <Link to="/trending" className="menu-link">
          <li className="menu-item">
            <AiTwotoneFire className="menu-icon" />
            <span className="menu-text">Trending</span>
          </li>
        </Link>
        <Link to="/gaming" className="menu-link">
          <li className="menu-item">
            <GiGamepad className="menu-icon" />
            <span className="menu-text">Gaming</span>
          </li>
        </Link>
        <Link to="/saved-videos" className="menu-link">
          <li className="menu-item">
            <MdPlaylistAdd className="menu-icon" />
            <span className="menu-text">Saved Videos</span>
          </li>
        </Link>
      </ul>
    </div>
    <div className="contact-container">
      <h2 className="contact-title">CONTACT US</h2>
      <div className="social-media-icons-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="social-media-icon"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="social-media-icon"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked logo"
          className="social-media-icon"
        />
      </div>
      <p>Enjoy! How to see your channels and recommendations!</p>
    </div>
  </nav>
)

export default NavigationBar
