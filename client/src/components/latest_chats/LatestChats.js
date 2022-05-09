import styles from '../../styles/LatestChats.module.css'
import ContainerHeading from '../container_heading/ContainerHeading'
import LatestChat from '../latest_chat/LatestChat'

// function LatestChats({ results, container, ...props }) {
function LatestChats({ results }) {
  return (
    <>
      { results.length > 0 && <ContainerHeading text="Lastest Chats" />}
      <div className={styles['latest-chats']}>
        {
          results.map((result) => (
            <LatestChat
              key={result.id}
              username={result.username}
              picture={result.picture}
              time={result.time}
              message={result.message}
            />
          ))
        }
      </div>
    </>
  )
}

export default LatestChats
