import styles from '../../styles/Messages.module.css'

function MessageBody({ classes, content }) {
  return (
    <div className={`${styles.message__body} ${styles[classes]}`}>
      <p>{content}</p>
    </div>
  )
}

export default MessageBody