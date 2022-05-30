const SetSocketServer = (io) => {
  let users = []
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

  return io.on('connection', (socket) => {
    console.log('A user connected')
    io.emit('welcome', 'hello, this is the socket server')

    socket.on('addUser', (userId) => {
      addUser(userId, socket.id)
      io.emit('getUsers', users)
    })

    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
      const receiver = getUser(receiverId)
      io.to(receiver?.socketId).emit('getMessage', {
        senderId,
        message
      })
    })

    socket.on('disconnect', () => {
      console.log('a user disconnected!')
      removeUser(socket.id)
      io.emit('getUsers', users)
    })
  })
}

module.exports = SetSocketServer
