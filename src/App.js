import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import AppContext from './context/AppContext'

class App extends Component {
  state = {
    // Define shared state properties here
    isDarkTheme: false,
    savedVideos: [],
    toggleTheme: this.toggleTheme,
    addToSaveVideos: this.addToSaveVideos,
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addToSaveVideos = video => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, video],
    }))
  }

  removeSaveVideos = videoId => {
    this.setState(prevState => ({
      savedVideos: prevState.savedVideos.filter(video => video.id !== videoId),
    }))
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state
    console.log(savedVideos)

    return (
      <AppContext.Provider
        value={{
          isDarkTheme,
          savedVideos,
          toggleTheme: this.toggleTheme,
          addToSaveVideos: this.addToSaveVideos,
          removeSaveVideos: this.removeSaveVideos,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App
