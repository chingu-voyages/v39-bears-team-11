import styles from '../../styles/LatestChats.module.css'
import ContainerHeading from '../container_heading/ContainerHeading'

const latestMessagesMock = [
  {
    profile_pic: 'test',
    name: 'test',
    message: 'asasd',
    time: 12,
  },

]

// function LatestChats({ results, container, ...props }) {
function LatestChats() {
  return (
    <>
      {/* { results.length > 0 && <ContainerHeading text="People" />} */}
      <ContainerHeading text="Lastest Chats" />
      asfagsgdsg
      {console.log('tyszmato')}
      <div className={styles['search-results']}>
        test
        {/* {
          results.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              container={container}
              {...props}
            />
          ))
        } */}
      </div>
    </>
  )
}

export default LatestChats
