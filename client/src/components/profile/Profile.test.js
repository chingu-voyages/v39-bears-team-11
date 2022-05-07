/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile />))

  test('renders the profile component', () => {
    const profileHeading = screen.getByText('Profile')
    const dummyText = screen.getByText('Component')
    expect(screen.getByRole('heading')).toContainElement(profileHeading)
    expect(screen.getByRole('main')).toContainElement(dummyText)
  })

  test('should render the profile icons', () => {
    const editIcon = screen.getByAltText('edit icon')
    const deleteIcon = screen.getByAltText('delete icon')
    expect(screen.getByRole('banner')).toContainElement(editIcon)
    expect(screen.getByRole('banner')).toContainElement(deleteIcon)
  })

  test('should render profile picture', () => {
    const profilePicture = screen.getByAltText('profile user icon')
    expect(screen.getByRole('main')).toContainElement(profilePicture)
  })
})
