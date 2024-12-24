import {Component} from 'react'
import './index.css'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Cookies from 'js-cookie'
import ReactPlayer from 'react-player/youtube'
import NavigationBar from '../NavigationBar'
import Header from '../Header'
import AppContext from '../../context/AppContext'

class VideoItemDetails extends Component {
  state = {
    videoDetailsList: {},
    isLiked: false,
    isDisLiked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        id: data.video_details.id,
        channelName: data.video_details.channel.name,
        description: data.video_details.description,
        channelProfileLogo: data.video_details.channel.profile_image_url,
        channelSubscriberCount: data.video_details.channel.subscriber_count,
        publishedDate: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        viewsCount: data.video_details.view_count,
        videoUrl: data.video_details.video_url,
      }
      console.log(updatedData)

      this.setState({videoDetailsList: updatedData})
    } else {
      console.error('Failed to fetch video details')
    }
  }

  likeVideo = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: false,
    }))
  }

  dislikeVideo = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: false,
    }))
  }

  renderVideoItemSuccessView = () => {
    const {videoDetailsList, isLiked, isDisLiked} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme, addToSaveVideos, removeSaveVideos, savedVideos} =
            value

          const {
            title,
            videoUrl,
            description,
            channelName,
            channelProfileLogo,
            channelSubscriberCount,
            publishedDate,
            viewsCount,
          } = videoDetailsList

          const likeColor = isLiked ? '#2563eb' : '#64748b'
          const disLikeColor = isDisLiked ? '#2563eb' : '#64748b'

          const isSaved = savedVideos.some(
            eachVideo => eachVideo.id === videoDetailsList.id,
          )

          const toggleSaveVideo = () => {
            if (isSaved) {
              removeSaveVideos(videoDetailsList.id)
            } else {
              addToSaveVideos(videoDetailsList)
            }
          }

          const savedText = isSaved ? 'Saved' : 'Save'
          const savedClassName = isSaved ? 'saved-button' : 'save-button'

          return (
            <div>
              {videoUrl && (
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="600px"
                />
              )}
              <h1 className="video-title">{title}</h1>
              <div className="views-container">
                <div className="views-info">
                  <p>{viewsCount} Views</p>
                  <p>{publishedDate}</p>
                </div>
                <div className="likes-container">
                  <button
                    className="reactions-container"
                    type="button"
                    onClick={this.likeVideo}
                    style={{color: likeColor}}
                  >
                    <BiLike />
                    <p>Like</p>
                  </button>
                  <button
                    className="reactions-container"
                    type="button"
                    onClick={this.dislikeVideo}
                    style={{color: disLikeColor}}
                  >
                    <BiDislike />
                    <p>Dislike</p>
                  </button>
                  <button
                    className={`reactions-container ${savedClassName}`}
                    type="button"
                    onClick={toggleSaveVideo}
                  >
                    <BiListPlus />
                    <p>{savedText}</p>
                  </button>
                </div>
              </div>
              <hr />
              <div className="channel-description-container">
                <img
                  src={channelProfileLogo}
                  alt={`${channelName} logo`}
                  className="channel-logo"
                />
                <div>
                  <div className="channel">
                    <p>{channelName}</p>
                    <p>{channelSubscriberCount} Subscribers</p>
                  </div>
                  <p className="video-description">{description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </AppContext.Consumer>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="Video-details-container">
          <div className="left-section">
            <NavigationBar />
          </div>
          <div className="right-section">
            {this.renderVideoItemSuccessView()}
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
