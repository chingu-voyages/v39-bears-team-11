import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Signup from './components/signup/Signup'
import Chats from './components/chats/Chats'
import ChatRoom from './components/chatroom/ChatRoom'
import Search from './components/search/Search'
import Profile from './components/profile/Profile'
import Friends from './components/friends/Friends'
import MainPage from './components/main_page/MainPage'
import EditProfilePage from './components/profile/EditProfilePage'

function App() {
  const currentUser = useSelector(({ user }) => user)
  console.log('Current User: ', currentUser)
  const isLoggedIn = () => currentUser.username && currentUser.token

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={isLoggedIn() ? <MainPage /> : <Signup />}>
            <Route path="/" element={<Chats />} />
            <Route path="chats" element={<Chats />} />
            <Route path="chatroom" element={<ChatRoom />} />
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit" element={<EditProfilePage />} />
            <Route path="friends" element={<Friends />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
