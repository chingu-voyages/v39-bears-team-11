import styles from '../../styles/ChatRoom-styles/Messages.module.css'
import defaultPicture from '../../icons/default-user-profile-image.png'

function MessageHead({
  classes,
  picture,
  name,
  time,
}) {
  /* Take a timestamp and return a properly formatted date string */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    /* hours = hours % 12 (the syntax below is required by eslint) */
    hours %= 12
    /* the hour '0' should be '12' */
    hours = hours || 12
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const strTime = `${hours}:${minutes} ${ampm}`

    /* Returns the date on the format dd/mm/yyyy hh:mm AM/PM */
    return `
    ${date.getDate()}/${new Intl.DateTimeFormat('en', { month: 'short' }).format(date)}/${date.getFullYear()}
      ${strTime}
    `
  }

  return (
    <div className={`${styles.message__head} ${styles[classes]}`}>
      <div className={styles.message__head__img}>
        <img src={picture || defaultPicture} alt={name} />
      </div>
      <div className={styles.message__head__text}>
        <h5>{name}</h5>
        <small>{formatTime(time)}</small>
      </div>
    </div>
  )
}

export default MessageHead
