import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortArrayOfObjects } from '../../utils/helper'
// to be uncommented once the message store is completed:
// import { setCurrentFriendId } from '../../store/features/messages/messagesSlice'
import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from './LatestChats'

// temporary mock data that will be replaced with data from chats store
import { chatsMockData } from './mock_messages'

function Chats() {
  // selectedFriendId is a state variable that stores the id of the currently
  // clicked friend. The change of this variable can happen in two places:
  // LatestChats - list of latest chats
  // ModalStart a chat - list of friends
  const [selectedFriendId, setSelectededFriendId] = useState()

  // Get friends list from the user state slice
  const friends = useSelector(({ user }) => user.friends)
  // Get the modal ref
  const modalRef = useRef()
  // Get the list of the latest messages, one message per contact
  const latestChats = chatsMockData.reduce(
    (newArr, currentChat) => {
      //  Use provided friend id (from user messages) to get the friend from the friends data
      const friendId = currentChat.id
      const friend = friends.find((contact) => contact.id.toString() === friendId)
      //  Use friend (from user friends array) to get friend's picture and username
      const messagePicture = friend.picture
      const messageUsername = friend.username
      //  Use all the messages from the current friend
      const allMessages = currentChat.messages
      //  Use helper function to sort these messages and return only the latest message
      //  sortArrayOfObjects arguments:
      //     -array of objects
      //     -object's property which the sorting will be based on
      //     -choice of either ascending or descending order
      //     -choice of returning either first item, last item, or the whole array
      const latestMessage = sortArrayOfObjects(allMessages, 'timestamp', 'desc', 'firstItem')
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
      // Add the above object to the list of objects that is being created in this reduce function
      newArr.push(newInstance)
      return newArr
    },
    [],
  )
  // Sort the list of the latest chats
  const latestChatsSorted = sortArrayOfObjects(latestChats, 'timestamp', 'desc', 'array')

  // Define functions for opening and closing the modal
  const onOpenModal = () => modalRef.current.showModal()
  const onCloseModal = () => modalRef.current.close()

  // onClick

  return (
    <div id="chats" className="container main">
      <StartAChatButton handleOnClick={onOpenModal} />
      <ModalStartAChat friends={friends} ref={modalRef} onCloseModal={onCloseModal} />
      <LatestChats chats={latestChatsSorted} />
    </div>
  )
}

export default Chats
