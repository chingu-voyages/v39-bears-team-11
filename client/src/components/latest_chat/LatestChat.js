import styles from '../../styles/LatestChats.module.css'

function LatestChat({
  username, picture, message, time,
}) {
  return (
    <div className={styles['latest-chat']}>
      <div className={styles['latest-chat__image']}>
        <img src={picture} alt="profile" />
      </div>
      <span className={styles['latest-chat__image']}>{username}</span>
      <span className={styles['latest-chat__message']}>{message}</span>
      <span className={styles['latest-chat__time']}>{time}</span>
    </div>
  )
}

export default LatestChat
