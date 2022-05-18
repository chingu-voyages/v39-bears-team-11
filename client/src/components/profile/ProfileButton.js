/* eslint-disable object-curly-newline */

function ProfileButton({ imgSrc, altText, styling, ...props }) {
  return (
    <button type="button" className={`${styling || ''}`} {...props}>
      <img src={imgSrc} alt={altText} />
    </button>
  )
}

export default ProfileButton
