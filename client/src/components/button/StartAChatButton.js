import Button from './Button'
import styles from '../../styles/Button.module.css'
import chatIcon from '../../icons/chats/chats-cta-icon.png'

function StartAChatButton({ handleStartAChatClick }) {
  return (
    <Button
      text="Start a chat"
      className={styles['button--start-a-chat']}
      onClick={handleStartAChatClick}
      icon={chatIcon}
      iconAlt="a chat icon"
    />
  )
}

export default StartAChatButton
