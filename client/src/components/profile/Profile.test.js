/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Profile from './Profile'

describe('Profile Page Feature', () => {
  beforeEach(() => render(<Profile />))

  test('render the empty Profile component', () => {
    expect(screen.getByTestId('empty')).toBeEmptyDOMElement()
  })

  test('render the navbar in profile component', () => {
    expect(screen.getByTestId('empty')).toContainHTML(
      '<div className={styles.navbar}></div>',
    )
  })
})
