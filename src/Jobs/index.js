import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileApi = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileApiStatus: profileApi.initial,
    profileData: [],
    employmentFilter: [],
    salaryFilter: '',
    jobsApiStatus: apiStatus.initial,
    searchInput: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getJobsDetails = async () => {
    this.setState({jobsApiStatus: apiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentFilter, salaryFilter, searchInput} = this.state
    const emp = employmentFilter.join(',')
    console.log(emp)
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${emp}&minimum_package=${salaryFilter}&search=${searchInput}`
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(jobsApiUrl, optionsJobs)
    if (responseJobs.ok === true) {
      const fetchedDataJobs = await responseJobs.json()
      const updatedDataJobs = fetchedDataJobs.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedDataJobs,
        jobsApiStatus: apiStatus.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatus.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: profileApi.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)

    if (response.ok === true) {
      const responseData = await response.json()
      const formattedData = {
        name: responseData.profile_details.name,
        profileImageUrl: responseData.profile_details.profile_image_url,
        shortBio: responseData.profile_details.short_bio,
      }
      this.setState({
        profileData: formattedData,
        profileApiStatus: profileApi.success,
      })
    } else {
      this.setState({profileApiStatus: profileApi.failure})
    }
  }

  onRetryButton = () => {
    this.getProfileDetails()
  }

  renderProfile = () => {
    const {profileData} = this.state
    const {shortBio, profileImageUrl, name} = profileData
    return (
      <div className="profile-section">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <button type="button" className="retry-button" onClick={this.onRetryButton}>
      Retry
    </button>
  )

  onRetryJobSearch = () => {
    this.getJobsDetails()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-info">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onRetryJobSearch}
      >
        Retry
      </button>
    </div>
  )

  renderProfileInprogress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderInprogress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSection = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileApi.failure:
        return this.renderProfileFailure()
      case profileApi.success:
        return this.renderProfile()
      case profileApi.inProgress:
        return this.renderProfileInprogress()
      default:
        return null
    }
  }

  onChangeEmploymentType = event => {
    const {employmentFilter} = this.state
    const filterData = employmentFilter.filter(each => each === event.target.id)
    if (filterData.length === 0) {
      this.setState(
        prevState => ({
          employmentFilter: [...prevState.employmentFilter, event.target.id],
        }),
        this.getJobsDetails,
      )
    } else {
      const filteredData = employmentFilter.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({employmentFilter: filteredData}, this.getJobDetails)
    }
  }

  onChangeSalary = event => {
    this.setState({salaryFilter: event.target.id}, this.getJobsDetails)
  }

  renderFilterSection = () => (
    <div className="filter-container">
      <h1 className="filter-type">Type of Employment</h1>
      <ul className="lists-container">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              onChange={this.onChangeEmploymentType}
            />
            <label className="label" htmlFor={each.employmentTypeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr />
      <h1 className="filter-type">Salary Range</h1>
      <ul className="lists-container">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="filter-item">
            <input
              type="radio"
              name="option"
              id={each.salaryRangeId}
              onChange={this.onChangeSalary}
            />
            <label className="label" htmlFor={each.salaryRangeId}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderJobs = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-info">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="job-item-container">
        {jobsData.map(each => (
          <JobItem key={each.id} jobData={each} />
        ))}
      </ul>
    )
  }

  renderJobsSection = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatus.failure:
        return this.renderFailure()
      case apiStatus.success:
        return this.renderJobs()
      case apiStatus.inProgress:
        return this.renderInprogress()
      default:
        return null
    }
  }

  onSearch = () => {
    this.getJobsDetails()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />

        <div className="jobs-container">
          <div className="search-container-mobile">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearch}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={this.onSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="filter-section">
            <div className="profile-container">
              {this.renderProfileSection()}
            </div>
            {this.renderFilterSection()}
          </div>
          <div className="jobs-details-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSearch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="job-details">{this.renderJobsSection()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
