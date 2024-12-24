import './index.css'
import {Link} from 'react-router-dom'

const VideoItem = props => {
  const {videoDetails} = props
  const {id, publishedAt, thumbnailUrl, title, viewCount, channel} =
    videoDetails

  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="video-item" key={id}>
        <img
          src={thumbnailUrl}
          alt={`Thumbnail of ${title}`}
          className="thumbnail"
        />
        <div className="video-info-container">
          <img
            src={channel.profileImageUrl}
            alt=""
            className="channel-profile"
          />
          <div className="video-info">
            <h1 className="video-title">{title}</h1>
            <p className="video-channel">{channel.name}</p>
            <p className="video-published">{publishedAt}</p>
            <p className="video-views">{viewCount} views</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
