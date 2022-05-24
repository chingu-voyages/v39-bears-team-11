/* eslint-disable object-curly-newline */
import { forwardRef, useRef, useState } from 'react'
import Button from '../button/Button'
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

  /* Upload picture and use camera button handlers open */
  /* their respective modals and close image modal.     */

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
          <Button text="x" onClick={() => ref.current.close()} />
        </div>

        <img src={defaultPicture} alt={imageAlt} />
        <div className={styles['imageModal__btn-container']}>
          <Button
            text={useCameraButtonText}
            onClick={handleUseCamera}
          />
          <Button
            text={uploadButtonText}
            onClick={handleUploadPicture}
          />
        </div>
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
