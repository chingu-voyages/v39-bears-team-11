import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import SearchBox from '../searchbox/SearchBox'

function Search() {
  const handleSearch = (event) => {
    event.preventDefault()
    // make request here and handle response
  }

  return (
    <>
      <Navbar />
      <div
        id="search"
        className="container"
      >
        <SearchBox searchHandler={handleSearch} />
        {/* <SearchResults /> */}
      </div>
      <Footer />
    </>
  )
}

export default Search
