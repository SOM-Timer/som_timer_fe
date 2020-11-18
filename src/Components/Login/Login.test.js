import React from 'react'
import { getByLabelText, render } from '@testing-library/react'
import Login from './Login'

describe('Login', () => {
  it('Should have the correct content when rendered', () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Login />
    )

    const loginHeading = getByRole('heading', /welcome to som timer/i)
    const appDescription = getByText(/som timer is a timer that cares. this application/i)
    const googleLoginButton = getByLabelText(/google login button/i)

    expect(loginHeading).toBeInTheDocument()
    expect(appDescription).toBeInTheDocument()
    expect(googleLoginButton).toBeInTheDocument()
  })
})
