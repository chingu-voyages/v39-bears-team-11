/* eslint-disable object-curly-newline */
import styles from '../../styles/Profile-styles/ProfileButton.module.css'

function ProfileButton({ imgSrc, altText, styling, ...props }) {
  return (
    <button
      type="button"
      className={`${styles.Profile__icons}, ${styling || ''}`}
      {...props}
    >
      <img src={imgSrc} alt={altText} />
    </button>
  )
}

export default ProfileButton
