import { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sortArrayOfObjects } from '../../utils/helper'
import { setCurrentFriendId, setMessages } from '../../store/features/messages/messagesSlice'
import messagesService from '../../services/messages'
import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from './LatestChats'

function Chats() {
  // Get the current user state
  const userState = useSelector(({ user }) => user)
  const {
    id,
    token,
    refreshToken,
    username,
    friends,
  } = userState
  const [chatsData, setChatsData] = useState([])
  // Define latestChatsSorted variable that later will be used for holding
  // the latestChats data only if the latestChats data and friends exist
  let latestChatsSorted = null

  // get the reducer action dispatch function
  const dispatch = useDispatch()

  // Get messages
  useEffect(() => {
    (async () => {
      const messages = await messagesService.getAll(id, token, refreshToken)
      setChatsData(messages)
      dispatch(setMessages(messages))
    })()
  }, [])

  // Get the modal ref
  const modalRef = useRef()

  // Use the navigation hook from react-router-dom
  const navigate = useNavigate()

  // Functions for opening and closing the modal
  const onOpenModal = () => modalRef.current.showModal()
  const onCloseModal = () => modalRef.current.close()

  // Handling the click on the selected chat or friend
  const onOpenAChatClick = (currentFriendId) => {
    dispatch(setCurrentFriendId(currentFriendId))
    // navigate to the chatroom page
    navigate('/chatroom')
  }

  // Check if the contact has friends
  if (chatsData) {
  // Get the list of the latest messages, one message per contact
    const latestChats = chatsData.reduce(
      (newArr, currentChat) => {
      //  Use provided friend id (from user messages) to get the friend from the friends data
        const { friendId } = currentChat
        const friend = friends.find((contact) => contact.id.toString() === friendId)

        // This check is to handle the case where someone
        // whose not in our friends list sent us messages
        if (friend) {
          const messagePicture = friend.picture
          const messageUsername = friend.username
          // Get all the messages from the current friend and substitute
          // the timestamp string with a Date object for comparison
          const allMessages = currentChat.messages.map((message) => ({
            ...message,
            timestamp: new Date(message.timestamp),
          }))
          //  Use helper function to sort these messages and return only the latest message
          //  sortArrayOfObjects arguments:
          //     -array of objects
          //     -object's property which the sorting will be based on
          //     -choice of either ascending or descending order
          //     -choice of returning either first item, last item, or the whole array
          const latestMessage = sortArrayOfObjects(allMessages, 'timestamp', 'desc', 'firstItem')

          // This check is for handling the case of a no messages
          if (latestMessage) {
            // Use the latest message to get the timestamp and the message content
            const messageContent = latestMessage.content
            const messageTimestamp = latestMessage.timestamp
            // Define new object with all prepared data
            const newInstance = {
              id: friendId,
              picture: messagePicture,
              username: messageUsername,
              message: messageContent,
              timestamp: messageTimestamp,
            }
            // Add the above object to the list of objects that is
            // being created in this reduce function
            newArr.push(newInstance)
          }
        }
        return newArr
      },
      [],
    )
    // Sort the list of the latest chats
    latestChatsSorted = sortArrayOfObjects(latestChats, 'timestamp', 'desc', 'array')
  }

  if (friends.length) {
    return (
      <div id="chats" className="container main">
        <StartAChatButton handleOnClick={onOpenModal} />
        <ModalStartAChat
          friends={friends}
          ref={modalRef}
          onCloseModal={onCloseModal}
          onOpenAChatClick={onOpenAChatClick}
        />
        {chatsData
          ? (
            <LatestChats
              chats={latestChatsSorted}
              onOpenAChatClick={onOpenAChatClick}
            />
          ) : null}
      </div>
    )
  } return (
    <div id="chats" className="container main">
      <h1>
        {`Hello ${username}! Welcome to LiteTalk!`}
      </h1>
      <h2>
        Only few more
        <span className="italic"> lite </span>
        steps...
      </h2>
      <h4>...to tell your friends how much breathtaking they are!</h4>
      <h5>
        To look for your friends and add them to your contacts list
        simply press the magnifying glass icon.
      </h5>
    </div>
  )
}

export default Chats
