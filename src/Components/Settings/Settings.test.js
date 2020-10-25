import React from 'react';
import Settings from './Settings'
import { fireEvent, getByRole, render } from '@testing-library/react';

describe('Settings', () => {
    it('Should render the correct content', () => {
        const { getByText, getByTestId } = render(<Settings />)

        const settingsHeader = getByText('Settings')
        const workIntervalInput = getByTestId('workInterval')
        const breakIntervalInput = getByTestId('breakInterval')
        
        expect(settingsHeader).toBeInTheDocument()
        expect(workIntervalInput).toBeInTheDocument()
        expect(breakIntervalInput).toBeInTheDocument()
    })

    it('Should have default values for each select', () => {
        const { getByTestId } = render(<Settings />)

        const workIntervalInput = getByTestId('workInterval')
        const breakIntervalInput = getByTestId('breakInterval')

        expect(workIntervalInput.value).toBe('25')
        expect(breakIntervalInput.value).toBe('5')
    })

    it('Should update it\'s values on change', () => {
        const { getByTestId } = render(<Settings />)
        
        const workIntervalInput = getByTestId('workInterval')
        const breakIntervalInput = getByTestId('breakInterval')

        fireEvent.change(workIntervalInput, { target: { value: '45'}})
        fireEvent.change(breakIntervalInput, { target: { value: '10'}})

        expect(workIntervalInput.value).toBe('45')
        expect(breakIntervalInput.value).toBe('10')
    })
})