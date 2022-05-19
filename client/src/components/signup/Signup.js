import styles from '../../styles/Signup.module.css'
import Logo from '../logo/Logo'
import LogoWhite from '../logo/LogoWhite'
import Illustration from '../../icons/signup/signup-illustration.png'

function Signup() {
  return (
    <div id="signup" className={styles.Signup}>
      <div className={styles['Signup__logo-illustration-container']}>
        <Logo styling={styles['Signup__logo-blue']} />
        <LogoWhite styling={styles['Signup__logo-white']} />
        <img src={Illustration} alt="Chats comming out of the computer screen. Conversation between 2 people." className={styles.Signup__illustration} />
      </div>
      <div className="forms">
        Right
      </div>
    </div>
  )
}

export default Signup
