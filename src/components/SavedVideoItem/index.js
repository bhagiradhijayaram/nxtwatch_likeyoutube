import './index.css'
import {Link} from 'react-router-dom'

const TrendingVideoItem = props => {
  const {savedVideosDetails} = props
  const {
    id,
    publishedDate,
    thumbnailUrl,
    title,
    viewsCount,
    channelName,
    channelProfileLogo,
    channelSubscriberCount,
    description,
    videoUrl,
  } = savedVideosDetails

  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="saved-video-item" key={id}>
        <img
          src={thumbnailUrl}
          alt={`Thumbnail of ${title}`}
          className="thumbnail"
        />
        <div className="saved-video-info-container">
          <div className="saved-video-info">
            <h1 className="saved-video-title">{title}</h1>
            <p className="saved-video-channel">{channelName}</p>
            <p className="saved-video-views">{viewsCount} views</p>
            <p className="saved-video-published">{publishedDate}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideoItem
