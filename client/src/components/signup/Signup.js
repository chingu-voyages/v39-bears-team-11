import { useState } from 'react'
import styles from '../../styles/Signup.module.css'
import Logo from '../logo/Logo'
import LogoWhite from '../logo/LogoWhite'
import Illustration from '../../icons/signup/signup-illustration.png'
import LoginButton from '../button/LoginButton'
import SignupButton from '../button/SignupButton'

function Signup() {
  const [formChoice, setFormChoice] = useState('signup')
  const handleFormChoiceClick = (choice) => (setFormChoice(choice))
  return (
    <div id="signup" className={styles.Signup}>
      <div className={styles['Signup__logo-illustration-container']}>
        <Logo className={styles['Signup__logo-blue']} />
        <LogoWhite className={styles['Signup__logo-white']} />
        <img src={Illustration} alt="Chats comming out of the computer screen. Conversation between 2 people." className={styles.Signup__illustration} />
      </div>
      <div className={styles['Signup__control-buttons']}>
        <LoginButton isActive={formChoice === 'login'} handleFormChoiceClick={handleFormChoiceClick} />
        <SignupButton isActive={formChoice === 'signup'} handleFormChoiceClick={handleFormChoiceClick} />
      </div>
    </div>
  )
}

export default Signup
