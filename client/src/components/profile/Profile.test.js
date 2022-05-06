/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile />))

  test('render the profile component', () => {
    expect(screen.getByText('Profile Page')).toBeInTheDocument()
  })
})
