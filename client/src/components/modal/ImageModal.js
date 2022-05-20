/* eslint-disable object-curly-newline */
import { forwardRef, useRef, useState } from 'react'
import Button from '../button/Button'
// import profilePicture from '../../icons/profile/profile-user-icon.svg'
import styles from '../../styles/ImageModal.module.css'
import UploadPictureModal from './UploadPictureModal'
import UseCameraModal from './UseCameraModal'

const ImageModal = forwardRef(({
  title,
  defaultPicture,
  imageAlt,
  formHandler,
  confirmButtonText,
  uploadButtonText,
  useCameraButtonText,
}, ref) => {
  const [isOpenUseCameraModal, setOpenUseCameraModal] = useState(false)

  const uploadPictureModalRef = useRef()
  const useCameraModalRef = useRef()

  const handleUploadPicture = () => {
    uploadPictureModalRef.current.showModal()
    ref.current.close()
  }

  const handleUseCamera = async () => {
    /* Checking Media Device Support */
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      useCameraModalRef.current.showModal()
      ref.current.close()
      setOpenUseCameraModal(true)
    }
  }

  return (
    <>
      <dialog ref={ref} className={styles.imageModal}>

        <div className={styles.imageModal__heading}>
          <h3>{title}</h3>
          <Button text="X" onClick={() => ref.current.close()} />
        </div>

        <img src={defaultPicture} alt={imageAlt} />
        <Button
          text={uploadButtonText}
          onClick={handleUploadPicture}
        />
        <Button
          text={useCameraButtonText}
          onClick={handleUseCamera}
        />
      </dialog>

      <UploadPictureModal
        ref={uploadPictureModalRef}
        defaultPicture={defaultPicture}
        imageAlt={imageAlt}
        formHandler={formHandler}
        confirmButtonText={confirmButtonText}
      />
      <UseCameraModal
        ref={useCameraModalRef}
        isOpen={isOpenUseCameraModal}
        onRequestClose={() => {
          useCameraModalRef.current.close()
          setOpenUseCameraModal(false)
        }}
        formHandler={formHandler}
        confirmButtonText={confirmButtonText}
      />
    </>
  )
})

export default ImageModal
