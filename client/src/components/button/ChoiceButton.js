import Button from './Button'
import styles from '../../styles/Button.module.css'

function ChoiceButton({ type, isActive, handleFormChoiceClick }) {
  return (
    <Button
      text={type}
      className={`${styles['button--choice']} ${isActive && styles.isactive}`}
      onClick={() => handleFormChoiceClick(type)}
    />
  )
}

export default ChoiceButton
