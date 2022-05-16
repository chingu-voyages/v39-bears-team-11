import cameraIcon from '../../icons/chat-room/chatroom-camera-icon.png'
import styles from '../../styles/Button.module.css'

function NewPictureButton({ clickHandler }) {
  return (
    <button
      className={styles['button--send-picture']}
      type="button"
      onClick={clickHandler}
    >
      <img src={cameraIcon} alt="camera" />
    </button>
  )
}

export default NewPictureButton
