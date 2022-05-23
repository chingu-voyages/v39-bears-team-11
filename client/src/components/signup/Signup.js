import { useState, useEffect } from 'react'
import Logo from '../logo/Logo'
import Illustration from '../../icons/signup/signup-illustration.png'
import ChoiceButton from '../button/ChoiceButton'
import SignupForm from './SignupForm'
import styles from '../../styles/Signup.module.css'

function Signup() {
  const [formChoice, setFormChoice] = useState('signup')
  const handleFormChoiceClick = (choice) => (setFormChoice(choice))
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    // Run everytime when validated [credentials] have been updated.
    //
    // if statement to prevent useEffect running on first render with empty data
    if (credentials.name && credentials.password) {
      console.log('Here are validated credentials: ', credentials)
    }
  }, [credentials])

  return (
    <div id="signup" className={styles.Signup}>
      <div className={styles.Signup__side}>
        <Logo />
        <img src={Illustration} alt="Chats comming out of the computer screen. Conversation between 2 people." className={styles.Signup__side__illustration} />
      </div>
      <div className={styles.Signup__main}>
        <div className={styles['Signup__main__logo-container']}>
          <Logo isWhite />
        </div>
        <div className={styles['Signup__main__control-buttons']}>
          <ChoiceButton choice="login" isActive={formChoice === 'login'} handleFormChoiceClick={handleFormChoiceClick} />
          <ChoiceButton choice="signup" isActive={formChoice === 'signup'} handleFormChoiceClick={handleFormChoiceClick} />
        </div>
        <SignupForm formChoice={formChoice} setCredentials={setCredentials} />
      </div>
    </div>
  )
}

export default Signup
