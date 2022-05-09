import styles from '../../styles/SearchResults.module.css'
import ContainerHeading from '../container_heading/ContainerHeading'
import SearchResult from '../search_result/SearchResult'

function SearchResults({ results, container, ...props }) {
  return (
    <>
      { results.length > 0 && <ContainerHeading text={container} />}
      <div className={styles['search-results']}>
        {
          results.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              container={container}
              {...props}
            />
          ))
        }
      </div>
    </>
  )
}

export default SearchResults
