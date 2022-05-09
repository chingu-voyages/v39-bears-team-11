import StartAChatButton from '../button/StartAChatButton'
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
    message: 'I’ll have to check my schedule. We will meet tommorow and discuss this in... ',
    time: 12,
  },
  {
    id: 4,
    picture: 'https://robohash.org/animiiustoaut.png?size=80x80&set=set1',
    username: 'Moody Laverty',
    message: 'Alright. I’ll talk to you soon.',
    time: 12,
  },

]

function Chats() {
  return (
    <div
      id="chats"
      className="container main"
    >
      <StartAChatButton />
      <LatestChats results={latestChatsData} />
    </div>
  )
}

export default Chats
