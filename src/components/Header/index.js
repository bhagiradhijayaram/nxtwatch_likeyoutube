import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoClose} from 'react-icons/io5'

import {
  AiFillHome,
  AiTwotoneFire,
  GiGamepad,
  MdPlaylistAdd,
} from 'react-icons/all'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        {/* Mobile Navbar */}
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </Link>

          <ul className="nav-bar-mobile-icons-container">
            <li>
              <Link to="/">
                <FaMoon
                  className="nav-item-mobile-link"
                  color="black"
                  aria-label="Toggle Theme"
                />
              </Link>
            </li>
            <li>
              <Popup
                modal
                trigger={
                  <button
                    type="button"
                    className="nav-mobile-btn nav-item-mobile-link"
                    aria-label="Logout"
                  >
                    <GiHamburgerMenu color="black" />
                  </button>
                }
                className="popup-container"
              >
                {close => (
                  <div className="popup-nav-content">
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

                    <div className="popup-buttons">
                      <button
                        type="button"
                        className="pop-close-button"
                        onClick={() => {
                          close()
                        }}
                      >
                        <IoClose color="black" size={25} />
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
            <li>
              <Popup
                modal
                trigger={
                  <button
                    type="button"
                    className="nav-mobile-btn"
                    aria-label="Logout"
                  >
                    <FiLogOut color="black" />
                  </button>
                }
                className="popup-container"
              >
                {close => (
                  <div className="popup-content">
                    <p className="logout-para">
                      Are you sure you want to logout?
                    </p>
                    <div className="popup-buttons">
                      <button
                        type="button"
                        className="popup-cancel-button"
                        onClick={close}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="popup-confirm-button"
                        onClick={() => {
                          onClickLogout()
                          close()
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
        </div>

        {/* Desktop Navbar */}
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                <FaMoon color="black" size={30} aria-label="Toggle Theme" />
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/profile" className="nav-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-image"
                />
              </Link>
            </li>
            <li className="nav-menu-item">
              <Popup
                modal
                trigger={
                  <button type="button" className="logout-desktop-btn">
                    Logout
                  </button>
                }
                className="popup-container"
              >
                {close => (
                  <div className="popup-content">
                    <p className="logout-para">
                      Are you sure you want to logout?
                    </p>
                    <div className="popup-buttons">
                      <button
                        type="button"
                        className="popup-cancel-button"
                        onClick={close}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="popup-confirm-button"
                        onClick={() => {
                          onClickLogout()
                          close()
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
