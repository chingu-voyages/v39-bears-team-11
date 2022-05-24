import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../styles/ChatRoom-styles/MessageForms.module.css'
import NewMessageForm from '../new_message_form/NewMessageForm'
import NewPictureButton from '../button/NewPictureButton'
import defaultPicture from '../../icons/img-file-placeholder.png'
import ImageModal from '../modal/ImageModal'
import { addPictureMessage } from '../../store/features/messages/messagesSlice'

function MessageForms() {
  const imageModalRef = useRef()
  const dispatch = useDispatch()

  const SendPictureFormHandler = (imgFile) => {
    console.log(imgFile)
    dispatch(addPictureMessage(imgFile))
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
