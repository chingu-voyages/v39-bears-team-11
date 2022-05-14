import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { sortArrayOfObjects } from '../../utils/helper'
import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from '../latest_chats/LatestChats'

// temporary mock data that will be replaced with data from chats store
import { chatsMockData } from './mock_messages'

function Chats() {
  // **********
  // import action from chat store and dispatch an action that sets the current friend id
  // with an id of a friend that has been clicked
  // **********

  // Get friends list from the user state slice
  const friends = useSelector(({ user }) => user.friends)
  // Get the modal ref
  const modalRef = useRef()
  // Get the list of the latest messages
  const lastestChats = chatsMockData.reduce(
    (newArr, currentChat) => {
      //  Use provided friend id (from user messages) to get the friend index in the friends data
      const friendId = currentChat.id
      const friendIndex = friends.findIndex((friend) => friend.id.toString() === friendId)
      //  Use friend index (from user friends array) to get friend's picture and username
      const messagePicture = friends[friendIndex].picture
      const messageUsername = friends[friendIndex].username
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
        time: messageTimestamp,
      }
      // Add the above object to the list of objects that is being created in this reduce function
      newArr.push(newInstance)
      return newArr
    },
    [],
  )

  // Define functions for opening and closing the modal
  const onOpenModal = () => modalRef.current.showModal()
  const onCloseModal = () => modalRef.current.close()

  return (
    <div id="chats" className="container main">
      <StartAChatButton handleOnClick={onOpenModal} />
      <ModalStartAChat friends={friends} ref={modalRef} handleOnClick={onCloseModal} />
      <LatestChats chats={lastestChats} />
    </div>
  )
}

export default Chats
