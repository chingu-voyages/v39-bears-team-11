import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../styles/User.module.css'
import { ReactComponent as UserIcon } from '../../icons/profile/profile-user-icon.svg'
import { ReactComponent as LogoutIcon } from '../../icons/profile/profile-logout-icon.svg'
import defaultPicture from '../../icons/default-user-profile-image.png'
import { logout } from '../../store/features/users/usersSlice'

function User() {
  const userState = useSelector(({ user }) => user)
  const { username, picture } = userState
  const userRef = useRef()
  const dispatch = useDispatch()

  const handleUserClick = () => {
    userRef.current.classList.toggle('open')
  }

  const handleLogout = () => {
    dispatch(logout())
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
        <img src={picture || defaultPicture} alt={username} />
      </div>

      <div className={styles.user__dropdown}>
        <h5>{username}</h5>
        <div className={styles.user__links}>
          <Link
            className={styles.user__link}
            to="profile"
          >
            <UserIcon className={styles['user__link-icon']} />
            My Profile
          </Link>
          <button
            type="button"
            className={styles.user__link}
            onClick={handleLogout}
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
