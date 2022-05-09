import styles from '../../styles/Messages.module.css'

function MessageHead({
  classes,
  picture,
  name,
  time
}) {
  return (
    <div className={`${styles.message__head} ${styles[classes]}`}>
      <div className={styles.message__head__img}>
        <img src={picture} alt={name}/>
      </div>
      <div className={styles.message__head__text}>
        <h5>{name}</h5>
        <small>{time}</small>
      </div>
    </div>
  )
}

export default MessageHead