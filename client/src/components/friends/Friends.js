import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBox from '../searchbox/SearchBox'
import SearchResults from '../search_results/SearchResults'
import { unFriend } from '../../store/features/users/usersSlice'

function Friends() {
  const userState = useSelector(({ user }) => user)
  const {
    id, username, email, token, picture, friends,
  } = userState
  const dispatch = useDispatch()

  const [currentResults, setCurrentResults] = useState(friends)
  const container = 'Friends'

  const handleSearch = (event) => {
    event.preventDefault()
    const searchKeywords = event.target.search.value
    console.log(searchKeywords)
    const results = friends.filter((friend) => (
      friend.username.includes(searchKeywords)))
    setCurrentResults(results)
  }

  const handleUnfriend = async (friendId) => {
    dispatch(unFriend({
      username,
      email,
      picture,
      friends: friends.map((friend) => friend.id)
        .splice(friends.indexOf(friendId), 1),
    }, id, token))
  }

  return (
    <div id="friends" className="container main">

      <SearchBox searchHandler={handleSearch} />
      <SearchResults
        results={currentResults}
        container={container}
        modalTitle="Confirm Unfriend"
        getModalText={(name) => `Are you sure you want to unfriend ${name} ?`}
        confirmButtonText="Unfriend"
        buttonClasses="button--danger"
        formHandler={handleUnfriend}
      />

    </div>
  )
}

export default Friends
