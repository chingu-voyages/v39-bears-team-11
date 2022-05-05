import axios from 'axios'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBox from '../searchbox/SearchBox'
import SearchResults from '../search_results/SearchResults'
import MainPage from '../main_page/MainPage'
import { addFriend } from '../../store/features/users/usersSlice'
// import peopleService from '../../services/people'

function Search() {
  const userState = useSelector(({ user }) => user)
  const {
    id, username, email, token, picture, friends,
  } = userState
  console.log(friends)
  const dispatch = useDispatch()

  const container = 'people'
  const [currentResults, setCurrentResults] = useState([])

  const handleSearch = async (event) => {
    event.preventDefault()
    const searchKeywords = event.target.search.value
    console.log(searchKeywords)

    /* Test search with json server */
    const response = await axios.get('http://localhost:5000/users')
    setCurrentResults(response.data.slice(0, 10))

    /* Send request to backend using peopleService */
    // results = await peopleService.search(searchKeywords)
    // setCurrentResults(results)
  }

  const handleAdd = (personId) => {
    /* Dispatch a addFriend action to user store */
    dispatch(addFriend({
      username,
      email,
      picture,
      friends: friends.map((friend) => friend.id).concat(personId),
    }, id, token))
  }

  return (
    <MainPage>
      <div
        id="search"
        className="container main"
      >
        <SearchBox searchHandler={handleSearch} />
        <SearchResults
          results={currentResults}
          container={container}
          modalTitle="Confirm Friend Request"
          modalText="Are you sure you want to add this person to your friends list ?"
          confirmButtonText="Add"
          formHandler={handleAdd}
        />
      </div>
    </MainPage>
  )
}

export default Search
