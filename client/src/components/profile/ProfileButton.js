/* eslint-disable object-curly-newline */
import styles from '../../styles/Profile-styles/ProfileButton.module.css'

function ProfileButton({ onClick, imgSrc, altText, styling }) {
  return (
    <button
      type="button"
      className={`${styles.Profile__icons}, ${styling || ''}`}
      onClick={onClick}
    >
      <img src={imgSrc} alt={altText} />
    </button>
  )
}

export default ProfileButton
