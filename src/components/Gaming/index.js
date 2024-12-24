import './index.css'
import Loader from 'react-loader-spinner'
import {GiGamepad} from 'react-icons/all'
import Cookies from 'js-cookie'
import {Component} from 'react'
import GamingVideoItem from '../GamingVideoItem'
import NavigationBar from '../NavigationBar'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  emptyResult: 'EMPTYRESULT',
}

class Gaming extends Component {
  state = {
    gamingVideos: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()

        if (data.videos.length > 0) {
          const formattedData = data.videos.map(eachData => ({
            id: eachData.id,
            thumbnailUrl: eachData.thumbnail_url,
            title: eachData.title,
            viewCount: eachData.view_count,
          }))

          this.setState({
            gamingVideos: formattedData,
            apiStatus: apiStatusConstants.success,
          })
        }
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
        console.error(`Failed to fetch videos: ${response.status}`)
      }
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
      console.error('An error occurred while fetching videos:', error)
    }
  }

  renderSuccessView = () => {
    const {gamingVideos} = this.state
    return (
      <div>
        <ul className="gaming-videos-list-container">
          {gamingVideos.map(eachItem => (
            <GamingVideoItem key={eachItem.id} gamingVideoDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="failure-image"
      />
      <h1 className="failure-heading">No Search results found</h1>
      <p className="failure-para">Try different key words or remove filter</p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderGamingView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="trending-container">
          <div className="left-section">
            <NavigationBar />
          </div>
          <div className="right-section">
            <div className="page-title-container">
              <div className="icon-container">
                <GiGamepad color="red" size={30} />
              </div>
              <h2 className="page-title">Gaming</h2>
            </div>
            {this.renderGamingView()}
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
