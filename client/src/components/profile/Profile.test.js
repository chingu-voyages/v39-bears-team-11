/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile />))

  test('render the empty Profile component', () => {
    expect(screen.getByTestId('empty')).not.toBeEmptyDOMElement()
  })

  test('render the navbar in profile component', () => {
    const navbar = screen.getByRole('navigation')
    expect(screen.getByTestId('empty')).toContainElement(navbar)
  })
})
