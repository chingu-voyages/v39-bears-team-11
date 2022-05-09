import styles from '../../styles/LatestChats.module.css'

function LatestChat({
  username, picture, message, time,
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
        {time}
        s
      </span>
    </div>
  )
}

export default LatestChat
