import Logo from '../logo/Logo'
import NavbarLinks from '../navbarlinks/NavbarLinks'
import User from '../user/User'
import styles from '../../styles/Navbar.module.css'

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={`container ${styles.navbar__inner}`}>
        <Logo />
        <NavbarLinks />
        <User />
      </div>
    </div>
  )
}

export default Navbar
