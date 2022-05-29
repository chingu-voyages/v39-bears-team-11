import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sortArrayOfObjects } from '../../utils/helper'
// *********************************************************
//
//            to be uncommented once the message store is completed:
//
//  import { setCurrentFriendId } from '../../store/features/messages/messagesSlice'
//  import { getAll } from '../../services/messages'
//  import { setMessages } from '../../store/features/messages/messagesSlice'
//
// *********************************************************
import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from './LatestChats'

// temporary mock data that will be replaced with data from chats store
// import { chatsMockData } from './mock_messages'

// temporaralily the chatsData will equal to the imported MockData
// const chatsData = [...chatsMockData]

// temporary chatsData equals null
const chatsData = null

function Chats() {
  // Get the current user state
  const userState = useSelector(({ user }) => user)

  // Assign friends and name of the user
  const { username, friends } = userState
  console.log(friends)

  // Define latestChatsSorted variable that later will be used for holding
  // the latestChats data only if the latestChats data and friends exist
  let latestChatsSorted = null

  // Get messages

  // get the reducer action dispatch function
  const dispatch = useDispatch()
  console.log(dispatch)

  // *********************************************************
  //
  //   to be uncommented once the message store is completed:
  //
  //           useEffect(() => {
  //             chatsData = await getAll(id, token)
  //             dispatch(setMessages(chatsData))
  //           }, [])
  //
  // *********************************************************

  // Get the modal ref
  const modalRef = useRef()

  // Use the navigation hook from react-router-dom
  const navigate = useNavigate()

  // Functions for opening and closing the modal
  const onOpenModal = () => modalRef.current.showModal()
  const onCloseModal = () => modalRef.current.close()

  // Handling the click on the selected chat or friend
  const onOpenAChatClick = (currentFriendId) => {
    // *********************************************************
    //
    //   to be uncomented when the message store is completed:
    //
    //       dispatch(setCurrentFriendId(currentFriendId))
    //
    // *********************************************************
    // temporary console functionality check:
    console.log('Friend Clicked: ', currentFriendId)
    // navigate to the chatroom page
    navigate('/chatroom')
  }

  // Check if the contact has friends or chats to start with
  if (chatsData) {
  // Get the list of the latest messages, one message per contact
    const latestChats = chatsData.reduce(
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
