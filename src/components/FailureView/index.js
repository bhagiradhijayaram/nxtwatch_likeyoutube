import './index.css'

const FailureView = () => (
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

export default FailureView
