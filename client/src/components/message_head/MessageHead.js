import styles from '../../styles/Messages.module.css'

function MessageHead({
  classes,
  picture,
  name,
  time,
}) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours %= 12 /* hours = hours % 12 */
    hours = hours || 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? `0 ${minutes}` : `${minutes}`
    const strTime = `${hours}:${minutes} ${ampm}`

    return `
    ${date.getDate()}/${new Intl.DateTimeFormat('en', { month: 'short' }).format(date)}/${date.getFullYear()}
      ${strTime}
    `
  }

  return (
    <div className={`${styles.message__head} ${styles[classes]}`}>
      <div className={styles.message__head__img}>
        <img src={picture} alt={name} />
      </div>
      <div className={styles.message__head__text}>
        <h5>{name}</h5>
        <small>{formatTime(time)}</small>
      </div>
    </div>
  )
}

export default MessageHead
