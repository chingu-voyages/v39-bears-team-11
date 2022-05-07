/* eslint-disable react/self-closing-comp */
import editIcon from '../../icons/profile/profile-edit-icon.svg'
import deleteIcon from '../../icons/profile/profile-delete-icon.svg'

function Profile() {
  return (
    <>
      <header>
        <h2>Profile</h2>
        <div>
          <img src={editIcon} alt="edit icon" />
          <img src={deleteIcon} alt="delete icon" />
        </div>
      </header>
      <main>
        <p>Component</p>
      </main>
    </>
  )
}

export default Profile
