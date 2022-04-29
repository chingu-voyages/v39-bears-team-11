import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import SearchBox from '../searchbox/SearchBox'
import SearchResults from '../search_results/SearchResults'
// import peopleService from '../../services/people'

const axios = require('axios')

function Search() {
  let results = []

  const handleSearch = async (event) => {
    event.preventDefault()
    const searchKeywords = event.target.search.value
    console.log(searchKeywords)
    const response = await axios.get('http://localhost:5000/users')
    results = response.data.slice(0, 10)
    // const results = await peopleService.search(searchKeywords)
  }

  return (
    <>
      <Navbar />
      <div
        id="search"
        className="container"
      >
        <SearchBox searchHandler={handleSearch} />
        <SearchResults results={results} />
      </div>
      <Footer />
    </>
  )
}

export default Search
