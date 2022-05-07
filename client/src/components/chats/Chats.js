import StartAChatButton from '../button/StartAChatButton'
import MainPage from '../main_page/MainPage'

function Chats() {
  return (
    <MainPage>
      <div
        id="chats"
        className="container main"
      >
        <StartAChatButton />
      </div>
    </MainPage>
  )
}

export default Chats
