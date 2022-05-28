import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUpUser, loginUser } from '../../store/features/users/usersSlice'
import Logo from '../logo/Logo'
import Illustration from '../../icons/signup/signup-illustration.png'
import ChoiceButton from '../button/ChoiceButton'
import SignupForm from './SignupForm'
import styles from '../../styles/Signup-styles/Signup.module.css'

function Signup() {
  // Set up formChoice variable to control status of the currently clicked
  // form option which sets the Login Mode or the Signup Mode
  const [formChoice, setFormChoice] = useState('signup')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Create function that handles the choices click and updates the
  // state formChoice variable accordingly
  const handleFormChoiceClick = (choice) => (setFormChoice(choice))

  // onValidateSubmit function is a function that is being passed as prop
  // to the SignupForm component. This function gathers the data from the form
  // component and comes back to this Signup component with validated credentials
  // that are ready to be passed onto the Login or Signup functions.
  const onValidatedSubmit = (validatedCredentials) => {
    if (formChoice === 'login') {
      dispatch(loginUser(validatedCredentials))
    }
    if (formChoice === 'signup') {
      dispatch(signUpUser(validatedCredentials))
    }
    navigate('/')
  }

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
        <SignupForm formChoice={formChoice} onValidatedSubmit={onValidatedSubmit} />
      </div>
    </div>
  )
}

export default Signup
