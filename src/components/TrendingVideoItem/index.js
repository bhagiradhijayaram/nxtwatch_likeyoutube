import './index.css'
import {Link} from 'react-router-dom'

const TrendingVideoItem = props => {
  const {trendingVideoDetails} = props
  const {id, publishedAt, thumbnailUrl, title, viewCount, channel} =
    trendingVideoDetails

  return (
    <Link to={`/videos/${id}`} className="link">
      <li className="trending-video-item" key={id}>
        <img
          src={thumbnailUrl}
          alt={`Thumbnail of ${title}`}
          className="thumbnail"
        />
        <div className="trending-video-info-container">
          <div className="trending-video-info">
            <h1 className="trending-video-title">{title}</h1>
            <p className="trending-video-channel">{channel.name}</p>
            <p className="trending-video-views">{viewCount} views</p>
            <p className="trending-video-published">{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideoItem
