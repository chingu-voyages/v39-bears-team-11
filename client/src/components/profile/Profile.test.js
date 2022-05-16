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

  // todo: write a test to mock the showmodal
  // it('should show modal', () => {
  //   const modal = jest.fn()
  //   userEvent.click(screen.getAllByRole('button')[1])
  //   expect(modal).toHaveBeenCalled()
  // })
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
