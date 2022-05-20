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

  const handleImgFileSelect = (event) => {
    console.log('a file was selected')
    console.log(event.target.files[0])
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

  return (
    <dialog ref={ref} className={`${styles.imageModal} ${styles['upload-picture-modal']}`}>

      <div className={styles.imageModal__heading}>
        <h3>Upload Picture</h3>
        <Button
          text="X"
          onClick={() => {
            resetState()
            ref.current.close()
          }}
        />
      </div>

      <img src={previewPicture || defaultPicture} alt={imageAlt} />

      <form
        method="dialog"
        onSubmit={() => {
          // Check selected file first
          formHandler(selectedFile)
          resetState()
        }}
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

        <Button
          text="choose file"
          onClick={() => imgFileInputRef.current.click()}
        />

        <ConfirmButton
          text={confirmButtonText}
          disabled={selectedFile === null}
        />
      </form>
    </dialog>
  )
})

export default UploadPictureModal
