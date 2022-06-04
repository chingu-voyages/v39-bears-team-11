import Moment from 'react-moment'
import styles from '../../styles/LatestChat.module.css'
import defaultPicture from '../../icons/default-user-profile-image.png'

function LatestChat({
  username, picture, message, timestamp, id, onOpenAChatClick,
}) {
  const dateToUnixTimestamp = () => (
    Math.floor(timestamp.getTime() / 1000)
  )

  const showContent = () => (
    typeof message === 'string'
      ? message
      : 'image file'
  )

  return (
    <button type="button" className={styles['latest-chat']} onClick={() => onOpenAChatClick(id)}>
      <div className={styles['latest-chat__image']}>
        <img src={picture || defaultPicture} alt="profile" />
      </div>
      <div className={styles['latest-chat__username-and-message-container']}>
        <span className={styles['latest-chat__username']}>{username}</span>
        <span className={styles['latest-chat__message']}>
          {showContent()}
        </span>
      </div>
      <span className={styles['latest-chat__time']}>
        <Moment unix fromNow>{dateToUnixTimestamp()}</Moment>
      </span>
    </button>
  )
}

export default LatestChat
