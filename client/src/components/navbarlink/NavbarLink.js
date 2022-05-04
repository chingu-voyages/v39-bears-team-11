import { NavLink } from 'react-router-dom'
import styles from '../../styles/Navbar.module.css'

function NavbarLink({ route, children }) {
  return (
    <NavLink
      to={route}
      className={({ isActive }) => {
        const linkClasses = [styles.navlink]
        if (isActive) linkClasses.push(styles['navlink--active'])
        return linkClasses.join(' ') // returns "navlink" or "navlink navlink--active"
      }}
    >
      {children}
    </NavLink>
  )
}

export default NavbarLink
