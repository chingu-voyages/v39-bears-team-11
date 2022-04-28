import styles from '../../Searchbox.module.css'
import searchIcon from '../../icons/searchbox/searchbox-search-icon.png'

function SearchBox ({ searchHandler }) {
  return (
    <form
      className={styles.searchbox}
      onSubmit={searchHandler}
    >
      <input
        type="search"
        name='search'
        required={ true }
        placeholder= 'Search people ...'
      />
      <button className={styles.searchbox__btn}>
        <img src={searchIcon} alt='magnifying glass'/>
      </button>
    </form>
  ) 
}

export default SearchBox