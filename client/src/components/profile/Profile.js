/* eslint-disable react/self-closing-comp */
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUserProfile } from '../../store/features/users/usersSlice'
import ProfileForm from './ProfileForm'
import ProfileButton from './ProfileButton'
import ProfileUser from './ProfileUser'
import Modal from '../modal/Modal'
import editIcon from '../../icons/profile/profile-edit-icon.svg'
import deleteIcon from '../../icons/profile/profile-delete-icon.svg'
import styles from '../../styles/Profile-styles/Profile.module.css'

function Profile() {
  // get the user state slice
  const currentUser = useSelector(({ user }) => user)
  // get the reducer action dispatch function
  const dispatch = useDispatch()
  // get the modal ref
  const modalRef = useRef()
  // delete user handler
  const handleDeleteProfile = () => {
    // dispatch delete profile action
    // after confirmation
    dispatch(deleteUserProfile(currentUser.id))
  }

  return (
    <div role="contentinfo" className={styles.Profile}>
      {/* header section contains the profile heading and profile
      actions buttons */}
      <header className={styles.Profile__heading}>
        <h2 className={styles.Profile__headText}>Profile</h2>
        <div className={styles.Profile__cta}>
          <Link to="/edit">
            <ProfileButton imgSrc={editIcon} altText="edit icon" />
          </Link>
          <ProfileButton
            onClick={() => modalRef.current.showModal()}
            imgSrc={deleteIcon}
            altText="delete icon"
          />
        </div>
      </header>

      {/* main section of the profile page contains the profile
      picture, the icon to edit it, and profile form controls */}
      <main className={styles.Profile__main}>
        <ProfileUser user={currentUser} />
        <ProfileForm user={currentUser} disable="yes" />
      </main>

      <Modal
        ref={modalRef}
        title="Confirm Delete"
        text="Are you sure you want to delete your profile?"
        onRequestClose={() => modalRef.current.close()}
        confirmButtonText="DELETE"
        buttonClasses="button--danger"
        formHandler={handleDeleteProfile}
      />
    </div>
  )
}

export default Profile
