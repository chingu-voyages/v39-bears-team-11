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
})
