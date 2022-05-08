/* eslint-disable react/self-closing-comp */
import editIcon from '../../icons/profile/profile-edit-icon.svg'
import deleteIcon from '../../icons/profile/profile-delete-icon.svg'
import profilePicture from '../../icons/profile/profile-user-icon.svg'
import updateIcon from '../../icons/profile/profile-picture-update-icon.svg'
import styles from '../../styles/Profile.module.css'

function Profile({ user }) {
  return (
    <div className={styles.Profile}>
      {/* header section contains the profile heading and profile
      actions buttons */}
      <header className={styles.Profile__heading}>
        <h2>Profile</h2>
        <div>
          <img
            src={editIcon}
            alt="edit icon"
            className={styles.Profile__icons}
          />
          <img
            src={deleteIcon}
            alt="delete icon"
            className={styles.Profile__icons}
          />
        </div>
      </header>

      {/* main section of the profile page contains the profile
      picture, the icon to edit it, and profile form */}
      <main className={styles.Profile__main}>
        <div className={styles.Profile__imgContainer}>
          <img
            src={user.picture || profilePicture}
            alt="profile user icon"
            className={`${styles.Profile__icons} ${styles.Profile__picture}`}
          />
          <img
            src={updateIcon}
            alt="profile user update icon "
            className={styles.Profile__editPicture}
          />
        </div>
        <form className={styles.Profile__form}>
          <label htmlFor="user-name">
            Name
            <input
              type="text"
              name="name"
              id="user-name"
              value={user.username}
              disabled
              readOnly
            />
          </label>

          <label htmlFor="user-email">
            Email
            <input
              type="email"
              name="email"
              id="user-email"
              value={user.email}
              disabled
              readOnly
            />
          </label>
        </form>
      </main>
    </div>
  )
}

export default Profile
