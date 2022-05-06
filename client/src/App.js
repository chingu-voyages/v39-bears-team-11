import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Signup from './components/signup/Signup'
import Chats from './components/chats/Chats'
import ChatRoom from './components/chatroom/ChatRoom'
import Search from './components/search/Search'
import Profile from './components/profile/Profile'
import Friends from './components/friends/Friends'

function App() {
  const currentUser = useSelector(({ user }) => user)
  console.log(currentUser)
  const isLogged = () => currentUser.username && currentUser.token

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={isLogged() ? <Chats /> : <Signup />}
          />
          <Route
            path="signup"
            element={<Signup />}
          />
          <Route
            path="/chats"
            element={<Chats />}
          />
          <Route
            path="/chatroom"
            element={<ChatRoom />}
          />
          <Route
            path="/search"
            element={<Search />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/friends"
            element={<Friends />}
          />
        </Routes>
      </Router>

    </div>
  )
}

export default App
