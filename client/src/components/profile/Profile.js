/* eslint-disable react/self-closing-comp */
import ProfileForm from './ProfileForm'
import editIcon from '../../icons/profile/profile-edit-icon.svg'
import deleteIcon from '../../icons/profile/profile-delete-icon.svg'
import profilePicture from '../../icons/profile/profile-user-icon.svg'
import updateIcon from '../../icons/profile/profile-picture-update-icon.svg'
import styles from '../../styles/Profile-styles/Profile.module.css'

function Profile({ user }) {
  return (
    <div role="contentinfo" className={styles.Profile}>
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
      picture, the icon to edit it, and profile form controls */}
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
        <ProfileForm user={user} disable="yes" />
      </main>
    </div>
  )
}

export default Profile
