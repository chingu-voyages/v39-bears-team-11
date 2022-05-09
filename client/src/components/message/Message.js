function Message({
  senderId,
  content,
  time,
  currentFriend,
}) {
  return (
    <div className={`${styles.message} ${styles[messageClasses]}`}>
      <MessageHead
        classes={messageHeadClasses}
        picture={currentFriend.picture}
        name={currentFriend.username}
        time={time}
      />
      <MessageBody
        classes={messageBodyClasses}
        content={content}
      />
    </div>
  )
}

export default Message
