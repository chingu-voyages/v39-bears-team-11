import styles from '../../styles/Profile-styles/Profileform.module.css'

function ProfileForm({ user, disable }) {
  return (
    <form className={styles.Profile__form}>
      <label htmlFor="user-name" className={styles['Profile__form-label']}>
        Name
        <input
          type="text"
          name="name"
          id="user-name"
          defaultValue={user.username}
          className={styles['Profile__form-input']}
          readOnly={disable || false}
        />
      </label>

      <label htmlFor="user-email" className={styles['Profile__form-label']}>
        Email
        <input
          type="email"
          name="email"
          id="user-email"
          defaultValue={user.email}
          className={styles['Profile__form-input']}
          readOnly={disable || false}
        />
      </label>
    </form>
  )
}

export default ProfileForm
