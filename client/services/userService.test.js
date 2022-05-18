/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
const userService = require('./userService')

// mock the userService.js module effectively
// turning every function in it into jest.fn()
jest.mock('./userService.js')
// mock all user service functions
const addFriend = jest.spyOn(userService, 'addFriend')
const unFriend = jest.spyOn(userService, 'unFriend')
const updateProfile = jest.spyOn(userService, 'updateProfile')
const deleteAccount = jest.spyOn(userService, 'deleteAccount')
const uploadPhoto = jest.spyOn(userService, 'uploadPhoto')

// dummy test data
const id = 1
const user = { username: 'adalovelace', email: 'adalove@gamil.com' }
const token = 'thisisamocktoken'
const imgData = 'https://fakeimgdata.com'
const response = { data: ['user1', 'user2', 'user3'] }

describe('User Service', () => {
  afterAll(() => jest.clearAllMocks())
  // test for addFriend service
  it('should call addFriend function', () => {
    addFriend()
    expect(addFriend).toHaveBeenCalled()
    expect(addFriend).toHaveBeenCalledTimes(1)
  })

  it('should call addFriend with params', () => {
    addFriend(id, user, token)
    expect(addFriend).toHaveBeenCalledWith(id, user, token)
  })

  it('should call addFriend and return response', () => {
    const addFriendMock = userService.addFriend.mockImplementation(() =>
      Promise.resolve(response.data),
    )
    expect(addFriendMock()).resolves.toEqual(
      expect.arrayContaining([expect.any(String)]),
    )
  })

  // test for unFriend service
  it('should call unFriend and with correct params', () => {
    unFriend(id, user, token)
    expect(unFriend).toHaveBeenCalled()
    expect(unFriend).toHaveBeenCalledTimes(1)
    expect(unFriend).toHaveBeenCalledWith(id, user, token)
  })

  it('should call unFriend and return response data', async () => {
    const req = unFriend.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toEqual(expect.arrayContaining([expect.any(String)]))
  })

  // test for updateProfile service
  it('should call updateProfile and with correct params', () => {
    updateProfile(id, user, token)
    expect(updateProfile).toBeCalled()
    expect(updateProfile).toBeCalledTimes(1)
    expect(updateProfile).toHaveBeenCalledWith(id, user, token)
  })

  it('should call updateProfile and return response data', async () => {
    const req = updateProfile.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toStrictEqual(expect.arrayContaining([expect.any(String)]))
  })

  // test for deleteAccount service
  it('should call deleteAccount and with correct params', () => {
    deleteAccount(id, token)
    expect(deleteAccount).toBeCalled()
    expect(deleteAccount).toBeCalledTimes(1)
    expect(deleteAccount).toHaveBeenCalledWith(id, token)
  })

  it('should call deleteAccount and return response data', async () => {
    const req = deleteAccount.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toEqual(expect.arrayContaining([expect.any(String)]))
  })

  // test for uploadPhoto service
  it('should call uploadPhoto and with correct params', () => {
    uploadPhoto(id, imgData, token)
    expect(uploadPhoto).toHaveBeenCalled()
    expect(uploadPhoto).toHaveBeenCalledTimes(1)
    expect(uploadPhoto).toHaveBeenCalledWith(id, imgData, token)
  })

  it('should call uploadPhoto and return response data', async () => {
    const req = uploadPhoto.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toEqual(expect.arrayContaining([expect.any(String)]))
  })
})