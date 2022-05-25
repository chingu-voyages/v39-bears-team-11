import Button from './Button'
import styles from '../../styles/Button.module.css'

function ChoiceButton({ choice, isActive, handleFormChoiceClick }) {
  return (
    <Button
      text={choice}
      className={`${styles['button--choice']} ${isActive && styles['button--choice-isactive']}`}
      onClick={() => handleFormChoiceClick(choice)}
    />
  )
}

export default ChoiceButton
