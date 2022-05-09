import styles from '../../styles/Profile-styles/ProfileButton.module.css'

function ProfileButton({ onClick, imgSrc, altText }) {
  return (
    <button type="button" className={styles.Profile__icons} onClick={onClick}>
      <img src={imgSrc} alt={altText} />
    </button>
  )
}

export default ProfileButton
