import styles from '../../styles/Signup.module.css'
import Logo from '../logo/Logo'
import Illustration from '../../icons/signup/signup-illustration.png'

function Signup() {
  return (
    <div id="signup" className={styles.Signup}>
      <div className={styles['Signup__logo-illustration-container']}>
        <Logo className={styles.Signup__logo} />
        <img src={Illustration} alt="Chats comming out of the computer screen. Conversation between 2 people." className={styles.Signup__illustration} />
      </div>
      <div className="forms">
        Right
      </div>
    </div>
  )
}

export default Signup
