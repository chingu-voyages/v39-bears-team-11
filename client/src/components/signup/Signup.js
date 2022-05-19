import { useState } from 'react'
import styles from '../../styles/Signup.module.css'
import Logo from '../logo/Logo'
import Illustration from '../../icons/signup/signup-illustration.png'
import ChoiceButton from '../button/ChoiceButton'

function Signup() {
  const [formChoice, setFormChoice] = useState('signup')
  const handleFormChoiceClick = (choice) => (setFormChoice(choice))
  return (
    <div id="signup" className={styles.Signup}>
      <div className={styles['Signup__logo-illustration-container']}>
        <Logo className={styles['Signup__logo-blue']} />
        <Logo isWhite className={styles['Signup__logo-white']} />
        <img src={Illustration} alt="Chats comming out of the computer screen. Conversation between 2 people." className={styles.Signup__illustration} />
      </div>
      <div className={styles.Signup__form__container}>
        <div className={styles['Signup__form__control-buttons']}>
          <ChoiceButton type="login" isActive={formChoice === 'login'} handleFormChoiceClick={handleFormChoiceClick} />
          <ChoiceButton type="signup" isActive={formChoice === 'signup'} handleFormChoiceClick={handleFormChoiceClick} />
        </div>
        <h4 className={styles.Signup__form__heading}>
          {formChoice === 'login' && 'Login To Your Account'}
          {formChoice === 'signup' && 'Create your Account'}
        </h4>
      </div>

    </div>
  )
}

export default Signup
