/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
const userService = require('./userService')

jest.mock('./userService.js')

const id = 1
const username = 'adalovelace'
const email = 'adalove@gmail.com'
const token = 'thisisamocktoken'
const imgData = 'https://fakeimgdata.com'
const response = { data: ['user1', 'user2', 'user3'] }

describe('User Service', () => {
  afterEach(() => jest.clearAllMocks())
  let addFriend = jest.spyOn(userService, 'addFriend')
  it('should call addFriend function', () => {
    addFriend()
    expect(addFriend).toHaveBeenCalled()
    addFriend.mockClear()

    addFriend()
    expect(addFriend).toHaveBeenCalledTimes(1)

    addFriend(id, username, token)
    expect(addFriend).toHaveBeenCalledWith(id, username, token)

    addFriend = userService.addFriend.mockImplementation(() =>
      Promise.resolve(response.data),
    )
    expect(addFriend()).resolves.toEqual(expect.arrayContaining([]))
  })

  it('should return response data', async () => {
    const unFriend = jest.spyOn(userService, 'unFriend')

    unFriend(id, username, token)
    expect(unFriend).toHaveBeenCalledWith(id, username, token)

    const req = unFriend.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toEqual(expect.arrayContaining([expect.any(String)]))
  })

  it('should return response data', async () => {
    const updateProfile = jest.spyOn(userService, 'updateProfile')

    updateProfile(id, username, email, token)
    expect(updateProfile).toHaveBeenCalledWith(id, username, email, token)

    const req = updateProfile.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toStrictEqual(expect.arrayContaining([]))
  })

  it('should return response data', async () => {
    const deleteProfile = jest.spyOn(userService, 'deleteProfile')

    deleteProfile(id, token)
    expect(deleteProfile).toHaveBeenCalledWith(id, token)

    const req = deleteProfile.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toEqual(expect.arrayContaining([]))
  })

  it('should return response data', async () => {
    const uploadPhoto = jest.spyOn(userService, 'uploadPhoto')

    uploadPhoto(id, imgData, token)
    expect(uploadPhoto).toHaveBeenCalledWith(id, imgData, token)

    const req = uploadPhoto.mockResolvedValueOnce(response.data)
    const res = await req()
    expect(res).toEqual(expect.arrayContaining([]))
  })
})
