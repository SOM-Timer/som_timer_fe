import React from 'react';
import Settings from './Settings'
import { fireEvent, render } from '@testing-library/react';
import { SettingsProvider } from '../../Context/SettingsContext';
jest.mock('../../helpers/audioHelper.js')

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
    const moodRatingInput = getByTestId('moodRating')

    expect(settingsHeader).toBeInTheDocument()
    expect(workIntervalInput).toBeInTheDocument()
    expect(breakIntervalInput).toBeInTheDocument()
    expect(soundInput).toBeInTheDocument()
    expect(moodRatingInput).toBeInTheDocument()
  })

  it('Should have default values for the breakInterval select and moodRating slider', () => {

    const { getByTestId } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    )

    const breakIntervalInput = getByTestId('breakInterval')
    const moodRatingInput = getByTestId('moodRating')

    expect(breakIntervalInput.value).toBe('5')
    expect(moodRatingInput.checked).toBe(true)
  })

  it('Should update its values on change', () => {

    const { getByTestId } = render(
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    )

    const workIntervalInput = getByTestId('workInterval')
    const breakIntervalInput = getByTestId('breakInterval')
    const soundInput = getByTestId("sound");
    const moodRatingInput = getByTestId('moodRating')

    fireEvent.blur(workIntervalInput, { target: { value: '45' } })
    fireEvent.blur(breakIntervalInput, { target: { value: '10' } })
    fireEvent.change(soundInput, { target: { value: 'balineseGong' } })
    fireEvent.click(moodRatingInput);

    expect(workIntervalInput.value).toBe('45')
    expect(breakIntervalInput.value).toBe('10')
    expect(soundInput.value).toBe('balineseGong')
    expect(moodRatingInput.checked).toBe(false)
  })
})