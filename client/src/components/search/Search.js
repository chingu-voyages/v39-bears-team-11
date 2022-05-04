import { useState } from 'react'
import SearchBox from '../searchbox/SearchBox'
import SearchResults from '../search_results/SearchResults'
import MainPage from '../main_page/MainPage'
// import peopleService from '../../services/people'

const axios = require('axios')

function Search() {
  const container = 'people'
  const [currentResults, setCurrentResults] = useState([])

  const handleSearch = async (event) => {
    event.preventDefault()
    const searchKeywords = event.target.search.value
    console.log(searchKeywords)
    const response = await axios.get('http://localhost:5000/users')
    setCurrentResults(response.data.slice(0, 10))
    console.log(currentResults)
    // const results = await peopleService.search(searchKeywords)
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
        />
      </div>
    </MainPage>
  )
}

export default Search
