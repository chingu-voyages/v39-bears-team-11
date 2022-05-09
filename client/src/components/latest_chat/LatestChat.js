import styles from '../../styles/LatestChats.module.css'

function LatestChat({
  username, picture, message, time, key,
}) {
  return (
    // <div className={styles['search-result']} data-id={key}>
    <div>
      <img src={picture} alt="profile" />
      {username}

      {message}
      {time}
      {key}
    </div>
  )
}

export default LatestChat
