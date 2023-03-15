import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFind = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="info-container">
          <h1 className="jobs-title">Find The Job That Fits Your Life</h1>
          <p className="jobs-info">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link className="link-item" to="/jobs">
            <button type="button" className="find-button" onClick={onClickFind}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
