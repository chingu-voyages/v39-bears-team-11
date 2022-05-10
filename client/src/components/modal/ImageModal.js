import { forwardRef } from 'react'
import Button from '../button/Button'
import profilePicture from '../../icons/profile/profile-user-icon.svg'
import styles from '../../styles/ImageModal.module.css'

const ImageModal = forwardRef(
  (
    {
      title,
      cameraButtonText,
      uploadPhotoText,
      formHandler,
      formHandlerArgument,
      close,
      photo,
    },
    ref,
  ) => (
    <dialog ref={ref} className={styles.modal}>
      <h3>{title}</h3>
      <img src={photo || profilePicture} alt="user portrait" />
      <form method="dialog" onSubmit={() => formHandler(formHandlerArgument)}>
        <Button text={cameraButtonText} />
        <Button text={uploadPhotoText} close={close} />
      </form>
    </dialog>
  ),
)

export default ImageModal
