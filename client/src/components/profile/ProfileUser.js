import { useRef } from 'react'
import ImageModal from '../modal/ImageModal'
import ProfileButton from './ProfileButton'
import profilePicture from '../../icons/profile/profile-user-icon.svg'
import updateIcon from '../../icons/profile/profile-picture-update-icon.svg'
import styles from '../../styles/Profile-styles/ProfileUser.module.css'

function ProfileUser({ user }) {
  // get the modal ref
  const imageModalRef = useRef()
  // change photo handler
  const handleChangePhoto = () => {
    // do something
  }

  return (
    <div className={styles.Profile__imgContainer}>
      <img
        src={user.picture || profilePicture}
        alt="profile user icon"
        className={`${styles.Profile__icons} ${styles.Profile__picture}`}
      />
      <ProfileButton
        imgSrc={updateIcon}
        altText="profile user update icon"
        styling={styles.Profile__editPicture}
        onClick={() => imageModalRef.current.showModal()}
      />

      <ImageModal
        ref={imageModalRef}
        title="Update Your Profile Picture"
        photo={user.picture}
        cameraButtonText="use camera"
        uploadButtonText="upload photo"
        formHandler={handleChangePhoto}
        close={() => imageModalRef.current.close()}
      />
    </div>
  )
}

export default ProfileUser
