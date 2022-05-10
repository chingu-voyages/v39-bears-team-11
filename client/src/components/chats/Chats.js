import StartAChatButton from '../button/StartAChatButton'
import ModalStartAChat from '../modal/ModalStartAChat'
import LatestChats from '../latest_chats/LatestChats'

const latestChatsData = [
  {
    id: 1,
    picture: 'https://robohash.org/fugiatenimvoluptatibus.png?size=80x80&set=set1',
    username: 'Irene Narty',
    message: 'Haha oh man , that was awesome 🔥',
    time: 12,
  },
  {
    id: 2,
    picture: 'https://robohash.org/ipsaliberoodit.png?size=80x80&set=set1',
    username: 'Khadidja Nackos',
    message: 'Gotta go, got a lot of homework today',
    time: 12,
  },
  {
    id: 3,
    picture: 'https://robohash.org/fugiataliquamrerum.png?size=80x80&set=set1',
    username: 'Jackline Nackos',
    message: 'I’ll have to check my schedule. We will meet tommorow and discuss this in and discuss this in... ',
    time: 12,
  },
  {
    id: 4,
    picture: 'https://robohash.org/animiiustoaut.png?size=80x80&set=set1',
    username: 'Moody Laverty',
    message: 'Alright. I’ll talk to you soon.',
    time: 12,
  },
  {
    id: 5,
    picture: 'https://robohash.org/animiiustoaut.png?size=80x80&set=set1',
    username: 'Moody Laverty',
    message: 'Alright. I’ll talk to you soon.',
    time: 12,
  },
  {
    id: 6,
    picture: 'https://robohash.org/animiiustoaut.png?size=80x80&set=set1',
    username: 'Moody Laverty',
    message: 'Alright. I’ll talk to you soon.',
    time: 12,
  },
  {
    id: 7,
    picture: 'https://robohash.org/animiiustoaut.png?size=80x80&set=set1',
    username: 'Moody Laverty',
    message: 'Alright. I’ll talk to you soon.',
    time: 12,
  },

]

// import chats from chats store - > request to message router to retrieve an array
// find the format of array in messages router
// retrieve profile pic and name from user store using the frriends ID received from message router

// look over chat array, sort, return latest message

// import use selector from react redux
// define user state as variable te value of which is going to be hwatever the user
// seleector returns from the store
// user selector will take argument of destructered

// set current friend.id I must send action.

// import action from chat store and dispatch and action that sets
// the current friend id with an i of a friend that has been clicked

// 2. GET => GET MESSAGES SENT OR RECEIVED BY A PARTICULAR USER
// parameters: user_id
// task: retrieve the list of user contacts, get all messages that contain
// - in the sender and receiver fields - the user id and the id of one of his contacts
//  response: an array of objects each formatted as follows:
//   {friend_id, messages: [ { content, sender_id, receiver_id , timestamp } ]

// const userState = useSelector(({ user }) => user)
function Chats() {
  return (
    <div
      id="chats"
      className="container main"
    >
      <StartAChatButton />
      <ModalStartAChat friends={latestChatsData} />
      <LatestChats chats={latestChatsData} />
    </div>
  )
}

export default Chats
