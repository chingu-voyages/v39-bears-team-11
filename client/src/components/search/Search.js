import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBox from '../searchbox/SearchBox'
import SearchResults from '../search_results/SearchResults'
import { addFriend } from '../../store/features/users/usersSlice'
import peopleService from '../../services/people'

function Search() {
  const userState = useSelector(({ user }) => user)
  const {
    id, username, email, token, picture, friends,
  } = userState
  const dispatch = useDispatch()

  const container = 'people'
  const [currentResults, setCurrentResults] = useState([])

  const handleSearch = async (event) => {
    event.preventDefault()
    const searchKeywords = event.target.search.value
    const results = await peopleService.search({
      searchKeywords,
    })
    setCurrentResults(results)
  }

  const handleAdd = (personId) => {
    /* Dispatch a addFriend action to user store */
    dispatch(
      addFriend(
        {
          username,
          email,
          picture,
          friends: friends.map((friend) => friend.id).concat(personId),
        },
        id,
        token,
      ),
    )
  }

  return (
    <div id="search" className="container main">

      <SearchBox searchHandler={handleSearch} container={container} />
      <SearchResults
        results={currentResults}
        container={container}
        modalTitle="Confirm Friend Request"
        getModalText={(name) => `Are you sure you want to add ${name} to your friends list ?`}
        confirmButtonText="Add"
        formHandler={handleAdd}
      />

    </div>
  )
}

export default Search
