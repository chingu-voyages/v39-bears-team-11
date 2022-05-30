import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import styles from '../../styles/ChatRoom-styles/MessageForms.module.css'
import NewMessageForm from '../new_message_form/NewMessageForm'
import NewPictureButton from '../button/NewPictureButton'
import defaultPicture from '../../icons/img-file-placeholder.png'
import ImageModal from '../modal/ImageModal'
import { addPictureMessage, appendMessage } from '../../store/features/messages/messagesSlice'

function MessageForms() {
  const userState = useSelector(({ user }) => user)
  const currentFriendId = useSelector(({ messages }) => messages.currentFriendId)
  const socket = useRef()
  const imageModalRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_URL)
    socket.current.on('welcome', (message) => {
      console.log(message)
    })
    socket.current.on('getMessage', ({ senderId, message }) => (
      senderId === currentFriendId
      && dispatch(appendMessage({
        sender: senderId,
        receiver: userState.id,
        content: message,
        timestamp: new Date().toISOString(),
      }))
    ))
  }, [])

  useEffect(() => {
    socket.current.emit('addUser', userState.id)
    socket.current.on('getUsers', (users) => {
      console.log(users)
    })
  }, [userState])

  const sendMessagetoSocket = (message) => {
    socket.current.emit('sendMessage', ({
      senderId: userState.id,
      receiverId: currentFriendId,
      message,
    }))
  }

  const SendPictureFormHandler = (imgFile) => {
    console.log(imgFile)
    dispatch(addPictureMessage(imgFile))
    sendMessagetoSocket(imgFile)
  }

  return (
    <div className={styles['message-forms']}>
      <NewMessageForm socketSendHandler={sendMessagetoSocket} />
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
