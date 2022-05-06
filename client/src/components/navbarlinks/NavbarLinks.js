import styles from '../../styles/Navbar.module.css'
import NavbarLink from '../navbarlink/NavbarLink'
import { ReactComponent as ChatsIcon } from '../../icons/navbar/navbar-chats-icon.svg'
import { ReactComponent as FriendsIcon } from '../../icons/navbar/navbar-friends-icon.svg'
import { ReactComponent as SearchIcon } from '../../icons/navbar/navbar-search-icon.svg'

function NavbarLinks() {
  return (
    <div className={styles.navbar__links}>
      <NavbarLink
        route="/chats"
      >
        <ChatsIcon className={styles['nav-icon']} />
      </NavbarLink>
      <NavbarLink
        route="/friends"
      >
        <FriendsIcon className={styles['nav-icon']} />
      </NavbarLink>
      <NavbarLink
        route="/search"
      >
        <SearchIcon
          className={styles['nav-icon']}
          id={styles['nav-icon__search']}
        />
      </NavbarLink>
    </div>
  )
}

export default NavbarLinks
