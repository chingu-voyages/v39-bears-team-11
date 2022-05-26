/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { BrowserRouter, Router } from 'react-router-dom'
import { store } from '../../store/store'
import EditProfilePage from './EditProfilePage'

const { user: currentUser } = store.getState()

describe('Profile Page Feature', () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <EditProfilePage user={currentUser} />
      </Provider>,
      { wrapper: BrowserRouter },
    ),
  )

  it('should render form controls with current user', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')
    expect(nameControl.value).toBe(currentUser.username)
    expect(emailControl.value).toBe(currentUser.email)
  })

  it('should have form controls that can be edited', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')
    userEvent.clear(nameControl)
    userEvent.clear(emailControl)

    userEvent.type(nameControl, 'chingu bears11')
    userEvent.type(emailControl, 'bears11@gmail.com')

    expect(nameControl.value).toBe('chingu bears11')
    expect(emailControl.value).toBe('bears11@gmail.com')
  })
})

describe('Edit Profile Page Redirect', () => {
  const history = createMemoryHistory()
  beforeEach(() =>
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <EditProfilePage user={currentUser} />
        </Provider>
      </Router>,
    ),
  )

  it('should render the buttons', () => {
    const [saveBtn, cancelBtn] = screen.getAllByRole('button')
    expect(saveBtn).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
  })

  it('should navigate to profile page on cancel', () => {
    const [, cancelBtn] = screen.getAllByRole('button')
    userEvent.click(cancelBtn)
    expect(history.location.pathname).toBe('/profile')
  })
})
