import styles from '../../styles/ChatRoom-styles/Messages.module.css'
import { imgToDataUrl } from '../../utils/helper'

function MessageBody({ classes, content }) {
  const showContent = () => {
    /* A message can be of type string or object */
    if (typeof content === 'string') {
      return (
        <p>{content}</p>
      )
    }

    return (
      <img src={imgToDataUrl(content)} alt="message" />
    )
  }

  return (
    <div className={`${styles.message__body} ${styles[classes]}`}>
      {showContent()}
    </div>
  )
}

export default MessageBody
