import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import styles from './styles/App.module.css'
import Signup from './components/signup/Signup'
import Chats from './components/chats/Chats'
import ChatRoom from './components/chatroom/ChatRoom'
import Search from './components/search/Search'
import Profile from './components/profile/Profile'
import Friends from './components/friends/Friends'

function App() {
  return (
    <div className="App">
      <header className={styles.App} />

      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Signup />}
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
