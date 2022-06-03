import { useSelector } from 'react-redux'
import { useRef } from 'react'
import styles from '../../styles/SearchResults.module.css'
import AddFriendButton from '../button/AddFriendButton'
import UnfriendButton from '../button/UnfriendButton'
import FriendTag from '../friend_tag/FriendTag'
import Modal from '../modal/Modal'
import defaultPicture from '../../icons/default-user-profile-image.png'

function SearchResult({
  result,
  container,
  modalTitle,
  getModalText,
  buttonClasses,
  confirmButtonText,
  formHandler,
}) {
  const friends = useSelector(({ user }) => user.friends)
  const modalRef = useRef()

  const showButton = () => {
    if (container === 'people') {
      const friend = friends.find((f) => f.id === result.id)

      if (friend) {
        return <FriendTag />
      }
      return (
        <AddFriendButton
          handleAddFriendClick={() => modalRef.current.showModal()}
        />
      )
    }
    return (
      <UnfriendButton
        handleUnfriendClick={() => modalRef.current.showModal()}
      />
    )
  }

  return (
    <div className={styles['search-result']} data-id={result.id}>
      <div className={styles['search-result__description']}>
        <div className={styles['search-result__image']}>
          <img src={result.picture || defaultPicture} alt={result.username} />
        </div>
        <div className={styles['search-result__text']}>
          <p>{result.username}</p>
        </div>
      </div>
      {showButton()}

      <Modal
        ref={modalRef}
        title={modalTitle}
        text={getModalText(result.username)}
        onRequestClose={() => modalRef.current.close()}
        confirmButtonText={confirmButtonText}
        buttonClasses={buttonClasses}
        formHandler={formHandler}
        formHandlerArgument={result.id}
      />
    </div>
  )
}

export default SearchResult
