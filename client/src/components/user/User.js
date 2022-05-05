import { useSelector } from 'react-redux'
import { useRef } from 'react'
import styles from '../../styles/User.module.css'
import { ReactComponent as UserIcon } from '../../icons/profile/profile-user-icon.svg'
import { ReactComponent as LogoutIcon } from '../../icons/profile/profile-logout-icon.svg'

function User() {
  const userState = useSelector(({ user }) => user)
  const { username, picture } = userState
  const userRef = useRef()

  const handleUserClick = () => {
    userRef.current.classList.toggle('open')
  }

  return (
    <div
      ref={userRef}
      className={styles.user}
    >
      <div
        role="button"
        className={styles.user__icon}
        onClick={handleUserClick}
        onKeyDown={handleUserClick}
        tabIndex={0}
      >
        <img src={picture} alt={username} />
      </div>

      <div className={styles.user__dropdown}>
        <h5>{username}</h5>
        <div className={styles.user__links}>
          <a
            className={styles.user__link}
            href="/profile"
          >
            <UserIcon className={styles['user__link-icon']} />
            My Profile
          </a>
          <button
            className={styles.user__link}
            type="button"
          >
            <LogoutIcon className={styles['user__link-icon']} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default User
