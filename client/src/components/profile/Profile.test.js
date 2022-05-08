/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile />))

  test('renders the profile component', () => {
    const profileHeading = screen.getByText('Profile')
    expect(screen.getByRole('heading')).toContainElement(profileHeading)
  })

  test('should render the profile icons', () => {
    const editIcon = screen.getByAltText('edit icon')
    const deleteIcon = screen.getByAltText('delete icon')
    expect(screen.getByRole('banner')).toContainElement(editIcon)
    expect(screen.getByRole('banner')).toContainElement(deleteIcon)
  })

  test('should render profile picture', () => {
    const profilePicture = screen.getByAltText('profile user icon')
    const profilePictureEditIcon = screen.getByAltText(
      'profile user update icon',
    )
    expect(screen.getByRole('main')).toContainElement(profilePicture)
    expect(screen.getByRole('main')).toContainElement(profilePictureEditIcon)
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
