import logoIcon from '../../icons/logo/litetalk-logo-icon.svg'
import logoName from '../../icons/logo/litetalk-logo-name.svg'
import styles from '../../styles/Logo.module.css'

function Logo({ styling }) {
  console.log(styling)
  return (
    <a
      href="/"
      className={`${styles.logo}  ${styling}`}
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

export default Logo
