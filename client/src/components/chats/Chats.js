import { useState } from 'react'
import { useSelector } from 'react-redux'
import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from '../latest_chats/LatestChats'

// mocked messages data
const retrievedMessages = [
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
        content: 'Look over chat array, sort, return latest message.',
        sender_id: '',
        receiver_id: '6',
        timestamp: 1652362500,
      },
      {
        content: 'Alright I will look over chat array, sort, and return latest message.',
        sender_id: '61cdd39a5a14f24e4f2f89c7',
        receiver_id: '6',
        timestamp: 1652362533,
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
        content: 'Ok thank you for all the details I should implement that tomorrow.',
        sender_id: '61cdd39a5a14f24e4f2f89c7',
        receiver_id: '33',
        timestamp: 1652271969,
      },
      {
        content: 'You always say tomorrow and it is never done.',
        sender_id: '33',
        receiver_id: '61cdd39a5a14f24e4f2f89c73',
        timestamp: 1652271970,
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

  const lastMessagesData = retrievedMessages.reduce(
    (newArr, currentMessage) => {
      const friendId = currentMessage.id
      const friendIndex = friends.findIndex((friend) => friend.id.toString() === friendId)
      const friendMessages = currentMessage.messages

      const newInstance = {
        id: friendId,
        picture: friends[friendIndex].picture,
        username: friends[friendIndex].username,
        message: friendMessages[friendMessages.length - 1].content,
        time: friendMessages[friendMessages.length - 1].timestamp,
      }
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
      <LatestChats chats={lastMessagesData} />
    </div>
  )
}

export default Chats
