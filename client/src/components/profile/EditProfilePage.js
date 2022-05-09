/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { useSelector } from 'react-redux'
import ProfileForm from './ProfileForm'
import styles from '../../styles/Profile-styles/EditProfile.module.css'
import Button from '../button/Button'

function EditProfilePage() {
  // select the user state from redux store
  const currentUser = useSelector(({ user }) => user)

  // handle the changes saved by the user
  const handleSave = () => {
    // save the edit
  }

  // discard the changes not saved by user
  const handleCancel = () => {
    // cancel the edit
  }

  return (
    <div role="contentinfo" className={styles.Edit__container}>
      <h2 className={styles.Edit__heading}>Edit Profile Information</h2>
      <ProfileForm user={currentUser} />
      <Button
        text="Save"
        className={styles.Edit__button}
        onClick={handleSave}
      />
      <Button
        text="Cancel"
        className={`${styles.Edit__button}, ${styles.Edit__buttonCancel}`}
        onClick={handleCancel}
      />
    </div>
  )
}

export default EditProfilePage
