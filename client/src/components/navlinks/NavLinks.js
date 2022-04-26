import styles from '../../styles/Navbar.module.css'
import { ReactComponent as ChatsIcon } from '../../icons/navbar/navbar-chats-icon.svg'
import { ReactComponent as FriendsIcon } from '../../icons/navbar/navbar-friends-icon.svg'
import { ReactComponent as SearchIcon } from '../../icons/navbar/navbar-search-icon.svg'

function NavLinks() {
  return (
    <div className={styles.navbar__links}>
      <a
        className={styles.navlink}
        href="/chats"
      >
        <ChatsIcon className={styles['nav-icon']} />
      </a>
      <a
        className={styles.navlink}
        href="/friends"
      >
        <FriendsIcon className={styles['nav-icon']} />
      </a>
      <a
        className={styles.navlink}
        href="/search"
      >
        <SearchIcon
          className={styles['nav-icon']}
          id={styles['nav-icon__search']}
        />
      </a>
    </div>
  )
}

export default NavLinks
