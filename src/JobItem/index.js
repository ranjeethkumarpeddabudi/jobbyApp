import {Link} from 'react-router-dom'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobItem = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
    employmentType,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-list-container">
        <div className="title-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="rating-section">
              <AiFillStar color="#fbbf24" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="location-section">
            <IoLocationSharp />
            <p>{location}</p>
            <BsBriefcaseFill />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
