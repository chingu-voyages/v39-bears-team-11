/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
const userService = require('./userService')

jest.mock('./userService.js')

const user = 'adalovelace'
const id = 1
const token = 'thisisamocktoken'
const response = { data: ['user1', 'user2', 'user3'] }

describe('User Service', () => {
  afterEach(() => jest.clearAllMocks())
  it('should call addFriend function', () => {
    const addFriend = jest.spyOn(userService, 'addFriend')
    addFriend()
    expect(addFriend).toHaveBeenCalled()

    addFriend(user, id, token)
    expect(addFriend).toHaveBeenCalledWith(user, id, token)
  })

  it('should implement addFriend function', () => {
    const addFriend = userService.addFriend.mockImplementation(() =>
      Promise.resolve(response.data),
    )
    expect(addFriend()).resolves.toEqual(response.data)
  })
})
