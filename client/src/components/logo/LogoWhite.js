import logoIcon from '../../icons/logo/litetalk-logo-icon-white.svg'
import logoName from '../../icons/logo/litetalk-logo-name-white.svg'
import styles from '../../styles/Logo.module.css'

function LogoWhite({ className }) {
  return (
    <a
      href="/"
      className={`${styles.logo}  ${className}`}
    >
      <img
        src={logoName}
        alt="Litetalk"
        className={styles.logo__name}
      />
      <img
        src={logoIcon}
        alt="message icon emitting rays"
        className={styles.logo__icon}
      />
    </a>
  )
}

export default LogoWhite
