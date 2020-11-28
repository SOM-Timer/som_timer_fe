import React from 'react'
import { render } from '@testing-library/react'
import { UserProvider } from '../../Context/UserContext'
import { SettingsProvider } from '../../Context/SettingsContext'
import Login from './Login'

describe('Login', () => {
  it('Should have the correct content when rendered', () => {
    window.gapi = {
      signin2: {
        render: jest.fn()
      }
    }

    const { getByRole, getByText, getByLabelText } = render(
      <SettingsProvider>
        <UserProvider>
          <Login />
        </UserProvider>
      </SettingsProvider>
    )

    const loginHeading = getByRole('heading', { name: /welcome to som timer/i })
    const appDescription = getByText(/som timer is a timer that cares. this application/i)
    const googleLoginButton = getByLabelText(/google login button/i)
    const homePageHeader = getByRole('heading', { name: /home page/i })
    const aboutPageHeader = getByRole('heading', { name: /about page/i })
    const settingsPageHeader = getByRole('heading', { name: /settings page/i })
    const statsPageHeader = getByRole('heading', { name: /stats page/i })
    const homePageDescription = getByText(/on the homepage, you/i)
    const settingsPageDescription = getByText(/on the settings page, you/i)
    const statsPageDescription = getByText(/on the stats page, you/i)
    const aboutPageDescription = getByText(/on the about page, you/i)

    expect(loginHeading).toBeInTheDocument()
    expect(appDescription).toBeInTheDocument()
    expect(googleLoginButton).toBeInTheDocument()
    expect(homePageHeader).toBeInTheDocument()
    expect(aboutPageHeader).toBeInTheDocument()
    expect(settingsPageHeader).toBeInTheDocument()
    expect(statsPageHeader).toBeInTheDocument()
    expect(homePageDescription).toBeInTheDocument()
    expect(settingsPageDescription).toBeInTheDocument()
    expect(statsPageDescription).toBeInTheDocument()
    expect(aboutPageDescription).toBeInTheDocument()
  })
})
