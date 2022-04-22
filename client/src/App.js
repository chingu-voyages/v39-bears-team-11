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
          <Route exact path="/">
            <Signup />
          </Route>
          <Route path="signup">
            <Signup />
          </Route>
          <Route path="/chats">
            <Chats />
          </Route>
          <Route path="/chatroom">
            <ChatRoom />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App
