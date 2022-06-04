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

  /* Create the socket client */
  const socket = useRef()

  const imageModalRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    /* Initialize the socket-io-client instance */
    socket.current = io(process.env.REACT_APP_SOCKET_URL)
    /* add a function to our socket client to handle      */
    /* the 'welcome' event sent by socket server for test */
    socket.current.on('welcome', (message) => {
      console.log(message)
    })

    /* Add a function to handle the 'getMessage' event received from socket server */
    socket.current.on('getMessage', ({ senderId, message }) => (
      /* Add a check to make sure that the received message   */
      /* was from the friend we are chatting with in Chatroom */
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
    /* Dispatch an addUser event to add current user   */
    /* to the users connected to the socket server now */
    socket.current.emit('addUser', userState.id)
    /* Add a function to handle the 'getUsers' event received from the socket sever */
    socket.current.on('getUsers', (users) => {
      console.log(users)
    })
  }, [userState])

  /* Dispatch a 'sendMessage' event to send message to socket server */
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
