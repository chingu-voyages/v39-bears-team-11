import Button from './Button'
import styles from '../../styles/Button.module.css'

function StartAChatButton({ handleStartAChatClick }) {
  return (
    <Button
      text="Start a chat"
      className={styles['button--start-a-chat']}
      onClick={handleStartAChatClick}
    />
  )
}

export default StartAChatButton
