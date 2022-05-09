import styles from '../../styles/SearchBox.module.css'
import searchIcon from '../../icons/searchbox/searchbox-search-icon.png'

function SearchBox({ searchHandler, container }) {
  return (
    <form
      className={styles.searchbox}
      onSubmit={searchHandler}
    >
      <input
        required
        type="search"
        name="search"
        placeholder={`Search ${container} ...`}
      />
      <button
        className={styles.searchbox__btn}
        type="submit"
      >
        <img src={searchIcon} alt="magnifying glass" />
      </button>
    </form>
  )
}

export default SearchBox
