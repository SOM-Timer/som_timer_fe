import React from 'react'
import FocusModal from './FocusModal'
import { render } from '@testing-library/react'
import { ViewProvider } from '../../Context/ViewContext'
import { SessionProvider } from '../../Context/SessionContext'
import { postSession } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('FocusModal', () => {
  it('Should have the correct content on load', () => {
    const { getByRole } = render(
      <ViewProvider>
        <SessionProvider>
          <FocusModal />
        </SessionProvider>
      </ViewProvider>
    )

    const modalText = getByRole('heading', { name: /get ready to focus/i })

    expect(modalText).toBeInTheDocument()
  })

  it('Should make a network request when rendered', () => {
    render(
      <ViewProvider>
        <SessionProvider>
          <FocusModal />
        </SessionProvider>
      </ViewProvider>
    )

    expect(postSession).toBeCalled()
  })
})