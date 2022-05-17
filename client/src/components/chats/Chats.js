import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortArrayOfObjects } from '../../utils/helper'
// *********************************************************
//
//            to be uncommented once the message store is completed:
//
// import { setCurrentFriendId } from '../../store/features/messages/messagesSlice'
//
// *********************************************************
import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from './LatestChats'

// temporary mock data that will be replaced with data from chats store
import { chatsMockData } from './mock_messages'

function Chats() {
  // Get friends list from the user state slice
  const friends = useSelector(({ user }) => user.friends)

  // get the reducer action dispatch function
  const dispatch = useDispatch()

  // Get the modal ref
  const modalRef = useRef()

  // Functions for opening and closing the modal
  const onOpenModal = () => modalRef.current.showModal()
  const onCloseModal = () => modalRef.current.close()

  // Handling the click on the selected chat or friend
  const onOpenAChatClick = (currentFriendId) => {
    // *********************************************************
    //
    //   to be uncomented when the message store is complete:
    //
    //       dispatch(setCurrentFriendId(currentFriendId))
    //
    // *********************************************************
    // temporary console functionality check:
    console.log('Friend Clicked: ', currentFriendId)
  }

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

  return (
    <div id="chats" className="container main">
      <StartAChatButton handleOnClick={onOpenModal} />
      <ModalStartAChat
        friends={friends}
        ref={modalRef}
        onCloseModal={onCloseModal}
        onOpenAChatClick={onOpenAChatClick}
      />
      <LatestChats
        chats={latestChatsSorted}
        onOpenAChatClick={onOpenAChatClick}
      />
    </div>
  )
}

export default Chats
