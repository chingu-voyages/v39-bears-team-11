import Moment from 'react-moment'
import styles from '../../styles/LatestChat.module.css'

function LatestChat({
  username, picture, message, timestamp,
}) {
  return (
    <div className={styles['latest-chat']}>
      <div className={styles['latest-chat__image']}>
        <img src={picture} alt="profile" />
      </div>
      <div className={styles['latest-chat__username-and-message-container']}>
        <span className={styles['latest-chat__username']}>{username}</span>
        <span className={styles['latest-chat__message']}>{message}</span>
      </div>
      <span className={styles['latest-chat__time']}>
        <Moment unix fromNow>{timestamp}</Moment>
      </span>
    </div>
  )
}

export default LatestChat
