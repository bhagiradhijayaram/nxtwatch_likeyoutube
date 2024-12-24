import './index.css'
import {Link} from 'react-router-dom'

const gamingVideoItem = props => {
  const {gamingVideoDetails} = props
  const {id, thumbnailUrl, title, viewCount} = gamingVideoDetails

  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="gaming-video-item" key={id}>
        <img
          src={thumbnailUrl}
          alt={`Thumbnail of ${title}`}
          className="gaming-image"
        />
        <div className="gaming-video-info-container">
          <div className="gaming-video-info">
            <h1 className="gaming-video-title">{title}</h1>
            <p className="gaming-video-views">{viewCount} Watch Worldwide</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default gamingVideoItem
