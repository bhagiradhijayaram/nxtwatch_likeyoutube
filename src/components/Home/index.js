import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {IoSearch, IoClose} from 'react-icons/io5'
import Header from '../Header'
import VideoItem from '../VideoItem'
import NavigationBar from '../NavigationBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  emptyResult: 'EMPTYRESULT',
}

class Home extends Component {
  state = {
    searchInput: '',
    videosData: [],
    banner: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (!jwtToken) {
      console.error('JWT token is missing.')
      return
    }

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
            channel: {
              name: eachData.channel.name,
              profileImageUrl: eachData.channel.profile_image_url,
            },
            id: eachData.id,
            publishedAt: eachData.published_at,
            thumbnailUrl: eachData.thumbnail_url,
            title: eachData.title,
            viewCount: eachData.view_count,
          }))

          this.setState({
            videosData: formattedData,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          console.error('Videos data is not in the expected format.')
          this.setState({
            apiStatus: apiStatusConstants.emptyResult,
          })
        }
      } else {
        console.error(`Failed to fetch videos: ${response.status}`)
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error while fetching videos:', error.message)
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = event => {
    if (event.type === 'click' || event.key === 'Enter') {
      this.getVideosData()
    }
  }

  renderVideosSuccessView = () => {
    const {videosData} = this.state
    return (
      <>
        <ul className="videos-list-container">
          {videosData.map(video => (
            <VideoItem key={video.id} videoDetails={video} />
          ))}
        </ul>
      </>
    )
  }

  renderVideosFailureView = () => {}

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderNoVideosView = () => (
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

  renderVideosFailureView = () => (
    <div className="no-videos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        className="no-video-image"
      />
      <h1 className="no-search-heading">Oops! Something Went Wrong</h1>
      <p className="no-search-para">
        We are having some trouble to complete your request.
      </p>
      <p>Please try again.</p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  removeBanner = () => this.setState({banner: false})

  renderBannerPage = () => (
    <div className="banner-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt=""
          className="banner-logo"
        />
        <h3 className="banner-heading">
          Buy Nxt Watch Premium prepaid plans with <br />
          UPI
        </h3>
        <button type="button" className="premium-button">
          GET IT NOW
        </button>
      </div>
      <button
        type="button"
        className="close-button"
        onClick={this.removeBanner}
      >
        <IoClose size={20} />
      </button>
    </div>
  )

  renderVideosView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosSuccessView()
      case apiStatusConstants.failure:
        return this.renderVideosFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.emptyResult:
        return this.renderNoVideosView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, banner} = this.state
    console.log(searchInput)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="left-section">
            <NavigationBar />
          </div>
          <div className="right-section">
            {banner ? this.renderBannerPage() : ''}
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                aria-label="Search Input"
                onChange={this.onChangeSearch}
                onKeyDown={this.onSearch}
              />
              <button
                type="button"
                className="search-button"
                aria-label="Search Button"
                onClick={this.onSearch}
              >
                <IoSearch />
              </button>
            </div>
            {this.renderVideosView()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
