/* Attach event hadlers and dispatchers on the socket io instance and return it. */
const SetSocketServer = (io) => {
  /* Connected users are stored on the socket server.        */
  /* A user is an object that contains two fields:           */
  /* a socketId derived from the socket client, and a userId */
  /* that is received when socket client connects to the     */
  /* socket server. When a client disconnects, the user is   */
  /* removed from the users list.                            */
  let users = []

  /* The following three functions are created to add, */
  /* get, and remove users from the users list.        */
  /* Add a new user to the users list if it has not been added yet */
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({
      userId,
      socketId,
    })
  }

  const getUser = (userId) => (
    users.find((user) => user.userId === userId)
  )

  const removeUser = (socketId) => (
    users = users.filter((user) => user.socketId !== socketId)
  )

  /* Add a function to handle the connection event received from the client */
  return io.on('connection', (socket) => {
    console.log('A user connected')
    /* When a client connects, dispatch a welcome message, for testing */
    io.emit('welcome', 'hello, this is the socket server')

    /* Add a function to handle the 'addUser' event sent by the client    */
    /* Store the user in the users list and return the current users list */
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id)
      io.emit('getUsers', users)
    })

    /* Add a function to handle the 'sendMessage' event sent by the client   */
    /* Find a user id in the user list who has id matching the receiver id   */
    /* Dispatch a 'getMessage' event to the receiving user with message body */
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
      const receiver = getUser(receiverId)
      io.to(receiver?.socketId).emit('getMessage', {
        senderId,
        message
      })
    })

    /* Add a function to handle client disconnection from the socket server */
    socket.on('disconnect', () => {
      console.log('a user disconnected!')
      removeUser(socket.id)
      io.emit('getUsers', users)
    })
  })
}

module.exports = SetSocketServer
