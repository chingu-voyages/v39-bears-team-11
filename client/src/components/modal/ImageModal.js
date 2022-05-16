/* eslint-disable object-curly-newline */
import { forwardRef } from 'react'
import Button from '../button/Button'
import profilePicture from '../../icons/profile/profile-user-icon.svg'
import styles from '../../styles/ImageModal.module.css'

const ImageModal = forwardRef(
  (
    { title, cameraButtonText, uploadButtonText, formHandler, photo, close },
    ref,
  ) => (
    <dialog ref={ref} className={styles.imageModal}>
      <div className={styles.imageModal__heading}>
        <h3>{title}</h3>
        <Button text="X" onClick={() => close()} />
      </div>
      <img src={photo || profilePicture} alt="user portrait" />
      <form method="dialog" onSubmit={() => formHandler()}>
        {/* <label htmlFor="image">
          <input type="file" alt="upload photo" id="image" name="image" />
        </label> */}
        <Button text={cameraButtonText} />
        <Button text={uploadButtonText} />
      </form>
    </dialog>
  ),
)

export default ImageModal
