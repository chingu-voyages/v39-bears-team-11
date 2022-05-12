/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import EditProfilePage from './EditProfilePage'

const { user: currentUser } = store.getState()

describe('Profile Page Feature', () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <EditProfilePage user={currentUser} />
      </Provider>,
    ),
  )

  it('should render form controls with current user', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')
    expect(nameControl.value).toBe(currentUser.username)
    expect(emailControl.value).toBe(currentUser.email)
  })

  it('should have form controls that can be edited', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')
    nameControl.value = ''
    emailControl.value = ''

    userEvent.type(nameControl, 'chingu bears11')
    userEvent.type(emailControl, 'bears11@gmail.com')

    expect(nameControl.value).toBe('chingu bears11')
    expect(emailControl.value).toBe('bears11@gmail.com')
  })
})
