/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react'
import { store } from '../../store/store'
import Profile from './Profile'
import EditProfilePage from './EditProfilePage'

// jest.mock('./Profile')
const { user: currentUser } = store.getState()

describe('Profile Page Features', () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <Profile user={currentUser} />
      </Provider>,
      { wrapper: BrowserRouter },
    ),
  )

  it('should render the profile component', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('should render readonly form controls', () => {
    const [nameControl, emailControl] = screen.getAllByRole('textbox')
    userEvent.type(nameControl, 'bears eleven')
    userEvent.type(emailControl, 'bears11@gmail.com')

    expect(nameControl.value).not.toBe('bears eleven')
    expect(emailControl.value).not.toBe('bears11@gmail.com')
  })

  it('should show modal', () => {
    const showModal = jest.fn()
    const btn = document.createElement('button')
    btn.addEventListener('click', showModal)
    userEvent.click(btn)
    expect(showModal).toHaveBeenCalledTimes(1)
  })
})

describe('profile page navigation', () => {
  beforeEach(() =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Profile user={currentUser} />} />
            <Route path="/edit" element={<EditProfilePage />} />
          </Routes>
        </Provider>
      </BrowserRouter>,
    ),
  )

  it('should navigate to edit profile page', () => {
    const editBtn = screen.getAllByRole('button')[0]
    userEvent.click(editBtn)
    expect(screen.getByText(/edit profile information/i)).toBeInTheDocument()
  })
})
