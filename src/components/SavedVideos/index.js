import {Component} from 'react'
import NavigationBar from '../NavigationBar'
import Header from '../Header'
import AppContext from '../../context/AppContext'
import SavedVideoItem from '../SavedVideoItem'

import './index.css'

class SavedVideos extends Component {
  renderSavedVideosSuccessView = () => (
    <AppContext.Consumer>
      {value => {
        const {savedVideos} = value
        return (
          <ul>
            {savedVideos.map(eachSaved => (
              <SavedVideoItem
                savedVideosDetails={eachSaved}
                key={eachSaved.id}
              />
            ))}
          </ul>
        )
      }}
    </AppContext.Consumer>
  )

  renderNoSavedVideosView = () => (
    <div className="no-saved-videos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved-videos-img"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  render() {
    return (
      <AppContext.Consumer>
        {value => {
          const {savedVideos} = value
          return (
            <>
              <Header />
              <div className="saved-details-container">
                <div className="left-section">
                  <NavigationBar />
                </div>
                <div className="right-section">
                  {savedVideos.length > 0
                    ? this.renderSavedVideosSuccessView()
                    : this.renderNoSavedVideosView()}
                </div>
              </div>
            </>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default SavedVideos
