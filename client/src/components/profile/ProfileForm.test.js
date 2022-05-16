/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { store } from '../../store/store'
import ProfileForm from './ProfileForm'

const { user: currentUser } = store.getState()
describe('Profile Form Controls', () => {
  beforeEach(() => render(<ProfileForm user={currentUser} />))

  it('should render profile form controls', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(nameControl.value).toBe('adalovelace')
    expect(emailControl.value).toBe('adalove@gamilcom')
  })
})
