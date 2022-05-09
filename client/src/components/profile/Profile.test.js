/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { store } from '../../store/store'
import Profile from './Profile'

const { user: currentUser } = store.getState()

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile user={currentUser} />))

  test('renders the profile heading', () => {
    expect(screen.getByRole('heading').textContent).toBe('Profile')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  test('should render the profile icons', () => {
    const iconsContainer = screen.getByRole('banner').querySelector('div')
    const editIcon = screen.getByAltText('edit icon')
    const deleteIcon = screen.getByAltText('delete icon')
    expect(iconsContainer).toContainElement(editIcon)
    expect(iconsContainer).toContainElement(deleteIcon)
  })

  test('should render profile picture', () => {
    const pictureContainer = screen.getByRole('main').querySelector('div')
    const profilePicture = screen.getByAltText('profile user icon')
    const profilePictureEditIcon = screen.getByAltText(
      'profile user update icon',
    )
    expect(pictureContainer).toContainElement(profilePicture)
    expect(pictureContainer).toContainElement(profilePictureEditIcon)
  })

  test('should render profile form controls', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')
    expect(nameControl).toHaveAttribute('disabled')
    expect(emailControl).toHaveAttribute('disabled')

    expect(nameControl.value).toBe('adalovelace')
    expect(emailControl.value).toBe('adalove@gamilcom')
  })
})
