import React from 'react';
import Settings from './Settings'
import { fireEvent, render } from '@testing-library/react';
import { SettingsProvider } from '../../Context/SettingsContext';

describe('Settings', () => {
  it('Should render the correct content', () => {
    const { getByRole, getByTestId } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    )

    const settingsHeader = getByRole('heading', { name: 'Settings' })
    const workIntervalInput = getByTestId('workInterval')
    const breakIntervalInput = getByTestId('breakInterval')
    const soundInput = getByTestId('sound')

    expect(settingsHeader).toBeInTheDocument()
    expect(workIntervalInput).toBeInTheDocument()
    expect(breakIntervalInput).toBeInTheDocument()
    expect(soundInput).toBeInTheDocument()
  })

  it('Should have default values for the breakInterval select', () => {
    const { getByTestId } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    )

    const breakIntervalInput = getByTestId('breakInterval')

    expect(breakIntervalInput.value).toBe('5')
  })

  it('Should update it\'s values on change', () => {
    const { getByTestId } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    )

    const workIntervalInput = getByTestId('workInterval')
    const breakIntervalInput = getByTestId('breakInterval')
    const soundInput = getByTestId("sound");

    fireEvent.change(workIntervalInput, { target: { value: '45' } })
    fireEvent.change(breakIntervalInput, { target: { value: '10' } })
    fireEvent.change(soundInput, { target: { value: 'gong' } })

    expect(workIntervalInput.value).toBe('45')
    expect(breakIntervalInput.value).toBe('10')
    expect(soundInput.value).toBe('gong')
  })
})