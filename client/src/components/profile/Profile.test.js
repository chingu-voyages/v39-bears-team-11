/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { store } from '../../store/store'
import Profile from './Profile'

const { user: currentUser } = store.getState()

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile user={currentUser} />))

  test('should render the profile component', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  test('should render the profile icons', () => {
    const iconsContainer = screen.getByRole('banner').querySelector('div')
    const editIcon = screen.getByAltText('edit icon')
    const deleteIcon = screen.getByAltText('delete icon')
    expect(iconsContainer).toContainElement(editIcon)
    expect(iconsContainer).toContainElement(deleteIcon)
  })

  test('should render profile picture', () => {
    const profilePicture = screen.getByAltText('profile user icon')
    expect(profilePicture.src).toBe(`http://localhost/${currentUser.picture}`)
  })

  test('form controls should be readonly', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')
    expect(nameControl).toHaveAttribute('readonly')
    expect(emailControl).toHaveAttribute('readonly')

    userEvent.type(nameControl, 'bears eleven')
    userEvent.type(emailControl, 'bears11@gmail.com')

    expect(nameControl.value).not.toBe('bears eleven')
    expect(emailControl.value).not.toBe('bears11@gmail.com')
  })
})
