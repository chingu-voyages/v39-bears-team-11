import { useState, forwardRef, useRef } from 'react'
import Button from '../button/Button'
import ConfirmButton from '../button/ConfirmButton'
import styles from '../../styles/ImageModal.module.css'

const UploadPictureModal = forwardRef(({
  defaultPicture,
  imageAlt,
  formHandler,
  confirmButtonText,
}, ref) => {
  const [previewPicture, setPreviewPicture] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const imgFileInputRef = useRef()

  const resetState = () => {
    setSelectedFile(null)
    setPreviewPicture(null)
  }

  /* If file size exceeds 2MB, display an alert to user */
  /* else, create an image url from file and set state. */
  const handleImgFileSelect = (event) => {
    if (event.target.files.length) {
      if (event.target.files[0].size > 2048000) alert('File size must not exceed 2MB')

      else {
        setPreviewPicture(URL.createObjectURL(event.target.files[0]))
        setSelectedFile(event.target.files[0])
      }
      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }

  const handleXButton = () => {
    resetState()
    ref.current.close()
  }

  const handleSubmit = () => {
    formHandler(selectedFile)
    resetState()
  }

  return (
    <dialog ref={ref} className={styles.imageModal}>

      <div className={styles.imageModal__heading}>
        <h3>Upload Picture</h3>
        <Button
          text="X"
          onClick={handleXButton}
        />
      </div>

      <img src={previewPicture || defaultPicture} alt={imageAlt} />

      <form
        method="dialog"
        onSubmit={handleSubmit}
      >
        <label htmlFor="image">
          <input
            // required
            className="hidden"
            ref={imgFileInputRef}
            type="file"
            accept="image/*"
            alt="upload photo"
            id="image"
            name="image"
            onChange={handleImgFileSelect}
          />
        </label>

        <div className={styles['imageModal__btn-container']}>
          <Button
            text="choose file"
            onClick={() => imgFileInputRef.current.click()}
          />

          {selectedFile
            && (
              <ConfirmButton
                text={confirmButtonText}
              />
            )}
        </div>
      </form>
    </dialog>
  )
})

export default UploadPictureModal
