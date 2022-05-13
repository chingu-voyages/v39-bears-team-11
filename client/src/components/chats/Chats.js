import { useState } from 'react'
import { useSelector } from 'react-redux'
import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from '../latest_chats/LatestChats'
import { sortArrayOfObjects } from '../../utils/helper'

// mocked messages data
const chatsMockData = [
  {
    id: '3',
    messages: [
      {
        content: 'Finished styling the ChatRoom page and testing it with dummy data from the messages store.',
        sender_id: '61cdd39a5a14f24e4f2f89c7',
        receiver_id: '3',
        timestamp: 1652361968,
      },
    ],
  },
  {
    id: '6',
    messages: [
      {
        content: 'Show. Alright I will look over chat array, sort, and return latest message.',
        sender_id: '61cdd39a5a14f24e4f2f89c7',
        receiver_id: '6',
        timestamp: 1652362533,
      },
      {
        content: 'Look over chat array, sort, return latest message.',
        sender_id: '',
        receiver_id: '6',
        timestamp: 1652362500,
      },

    ],
  },
  {
    id: '33',
    messages: [
      {
        content: 'Define user state as variable te value of which is going to be hwatever the user.',
        sender_id: '33',
        receiver_id: '61cdd39a5a14f24e4f2f89c7',
        timestamp: 1652261968,
      },
      {
        content: 'Show me and you always say tomorrow and it is never done.',
        sender_id: '33',
        receiver_id: '61cdd39a5a14f24e4f2f89c73',
        timestamp: 1652271970,
      },
      {
        content: 'Ok thank you for all the details I should implement that tomorrow.',
        sender_id: '61cdd39a5a14f24e4f2f89c7',
        receiver_id: '33',
        timestamp: 1652271969,
      },

    ],
  },
  {
    id: '66',
    messages: [
      {
        content: "Retrieve profile pic and name from user store using the frriends ID received from message router.'",
        sender_id: '61cdd39a5a14f24e4f2f89c7',
        receiver_id: '66',
        timestamp: 1652185568,
      },
    ],
  },
]

function Chats() {
  const userState = useSelector(({ user }) => user)
  const { friends } = userState
  const [show, setShow] = useState(false)

  const onOpenModal = () => {
    setShow(true)
  }

  const onCloseModal = (event) => {
    event.stopPropagation()
    setShow(false)
  }

  const lastestChats = chatsMockData.reduce(
    (newArr, currentChat) => {
      //  Use provided friend id (from user messages) to get the friend index in the friends data.
      const friendId = currentChat.id
      const friendIndex = friends.findIndex((friend) => friend.id.toString() === friendId)
      //  Use friend index (from user friends array) to get friend's picture and username
      const Picture = friends[friendIndex].picture
      const Username = friends[friendIndex].username

      //  Use all the messages from the current friend.
      const allMessages = currentChat.messages
      //  Use helper function to sort these messages and return only the latest message
      //  sortArrayOfObjects arguments:
      //     -array of objects
      //     -object's property which the sorting will be based on
      //     -choice of either ascending or descending order
      //     -choice of returning either first item, last item, or the whole array
      const latestMessage = sortArrayOfObjects(allMessages, 'timestamp', 'desc', 'firstItem')
      // Use the latest message to get the timestamp and the message content
      const Content = latestMessage.content
      const Timestamp = latestMessage.timestamp

      // Define new object with all prepared data
      const newInstance = {
        id: friendId,
        picture: Picture,
        username: Username,
        message: Content,
        time: Timestamp,
      }
      // Add this object to the list that is being created in this reduce function
      newArr.push(newInstance)
      return newArr
    },
    [],
  )

  return (
    <div
      id="chats"
      className="container main"
    >
      <StartAChatButton onOpenModal={onOpenModal} />
      <ModalStartAChat friends={friends} show={show} onCloseModal={onCloseModal} />
      <LatestChats chats={lastestChats} />
    </div>
  )
}

export default Chats
