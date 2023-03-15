import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <Link to="/" className="link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="home-logo"
        />
      </Link>

      <ul className="links-container">
        <Link to="/" className="link">
          <li className="link-item">
            <p>Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="link-item">
            <p>Jobs</p>
          </li>
        </Link>
        <li>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <div className="mobile-home-container">
        <Link to="/" className="link">
          <AiFillHome size={30} />
        </Link>
        <Link to="/jobs" className="link">
          <BsBriefcaseFill size={30} />
        </Link>
        <FiLogOut className="logout-icon" size={30} onClick={onClickLogout} />
      </div>
    </nav>
  )
}
export default withRouter(Header)
