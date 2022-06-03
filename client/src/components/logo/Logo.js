import { Link } from 'react-router-dom'
import logoIcon from '../../icons/logo/litetalk-logo-icon.svg'
import logoIconWhite from '../../icons/logo/litetalk-logo-icon-white.svg'
import logoName from '../../icons/logo/litetalk-logo-name.svg'
import logoNameWhite from '../../icons/logo/litetalk-logo-name-white.svg'
import styles from '../../styles/Logo.module.css'

function Logo({ isWhite }) {
  return (
    <Link
      to="/"
      className={styles.logo}
    >
      <img
        src={isWhite ? logoNameWhite : logoName}
        alt="Litetalk"
        className={styles.logo__name}
      />
      <img
        src={isWhite ? logoIconWhite : logoIcon}
        alt="message icon emitting rays"
        className={styles.logo__icon}
      />
    </Link>
  )
}

export default Logo
