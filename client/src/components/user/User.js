import styles from '../../styles/User.module.css'
// import woman from '../../icons/profile-picture-woman-unsplash.jpg'
import man from '../../icons/profile-picture-man-unsplash.jpg'

function User() {
  return (
    <div className={styles.user}>
      <img src={man} alt="user" />
    </div>
  )
}

export default User
