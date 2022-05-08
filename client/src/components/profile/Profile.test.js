/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile />))

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
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(nameControl.type).toBe('text')
    expect(emailControl.type).toBe('email')
    expect(nameControl).toHaveAttribute('disabled')
    expect(emailControl).toHaveAttribute('disabled')
  })
})
