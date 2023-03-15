import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    showMsg: false,
    errorMsg: '',
    username: '',
    password: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showMsg: true, errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showMsg, errorMsg, password, username} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="input-container" onSubmit={this.onClickLogin}>
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              id="username"
              placeholder="Username"
              className="input"
              value={username}
              onChange={this.onChangeUsername}
              type="text"
            />
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              id="password"
              placeholder="Password"
              className="input"
              type="password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showMsg && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
