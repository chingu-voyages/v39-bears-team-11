/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { isClickableInput } from '@testing-library/user-event/dist/utils'
import ProfileButton from './ProfileButton'

describe('should render clickable buttons', () => {
  it('should have a clickable button', () => {
    render(<ProfileButton />)
    const button = screen.getByRole('button')
    isClickableInput(button)
  })
})
