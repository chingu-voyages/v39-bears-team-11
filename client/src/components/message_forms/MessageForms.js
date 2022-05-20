import { useRef } from 'react'
import styles from '../../styles/MessageForms.module.css'
import NewMessageForm from '../new_message_form/NewMessageForm'
import NewPictureButton from '../button/NewPictureButton'
import defaultPicture from '../../icons/img-file-placeholder.png'
import ImageModal from '../modal/ImageModal'

function MessageForms() {
  const imageModalRef = useRef()
  const SendPictureFormHandler = (imgFile) => {
    // handle sending a picture
    // dispatch a addPictureMessage action
    console.log(imgFile)
  }

  return (
    <div className={styles['message-forms']}>
      <NewMessageForm />
      <NewPictureButton clickHandler={() => imageModalRef.current.showModal()} />

      <ImageModal
        ref={imageModalRef}
        title="Send a picture"
        defaultPicture={defaultPicture}
        imageAlt="picture preview"
        formHandler={SendPictureFormHandler}
        confirmButtonText="send"
        uploadButtonText="upload picture"
        useCameraButtonText="use camera"
      />
    </div>
  )
}

export default MessageForms
