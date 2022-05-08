/* eslint-disable react/self-closing-comp */
import editIcon from '../../icons/profile/profile-edit-icon.svg'
import deleteIcon from '../../icons/profile/profile-delete-icon.svg'
import profilePicture from '../../icons/profile/profile-user-icon.svg'
import updateIcon from '../../icons/profile/profile-picture-update-icon.svg'

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
        <div>
          <img src={profilePicture} alt="profile user icon" />
          <img src={updateIcon} alt="profile user update icon " />
        </div>
        <form>
          <label htmlFor="user-name">
            Name
            <input type="text" name="name" id="user-name" disabled />
          </label>

          <label htmlFor="user-email">
            Email
            <input type="email" name="email" id="user-email" disabled />
          </label>
        </form>
      </main>
    </>
  )
}

export default Profile
