import React from 'react'
import FocusModal from './FocusModal'
import { render, waitFor } from '@testing-library/react'
import { ViewProvider } from '../../Context/ViewContext'
import { SessionProvider } from '../../Context/SessionContext'
import { SettingsProvider } from '../../Context/SettingsContext'

import { UserProvider } from '../../Context/UserContext'
import { postSession } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('FocusModal', () => {
  it('Should have the correct content on load', async () => {
    const { findByRole } = render(
      <SettingsProvider>
        <UserProvider>
          <ViewProvider>
            <SessionProvider>
              <FocusModal />
            </SessionProvider>
          </ViewProvider>
        </UserProvider>
      </SettingsProvider>
    )

    const modalText = await findByRole('heading', { name: /get ready to focus/i })

    expect(modalText).toBeInTheDocument()
  })

  it('Should make a network request when rendered', async () => {
    render(
      <SettingsProvider>
        <UserProvider>
          <ViewProvider>
            <SessionProvider>
              <FocusModal />
            </SessionProvider>
          </ViewProvider>
        </UserProvider>
      </SettingsProvider>
    )

    await waitFor(() => expect(postSession).toBeCalled())
  })
})