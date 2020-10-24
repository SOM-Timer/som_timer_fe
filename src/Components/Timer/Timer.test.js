import React from 'react';
import { render } from '@testing-library/react'
import CountdownTimer from './Timer'

describe('Timer', () => {
    it('Should have the correct content when rendered', () => {
        const { getByRole, getByText } = render(<CountdownTimer />)

        const startButton = getByRole('button', { name: 'Start' })
        const resetButton = getByRole('button', { name: 'Reset' })
        const pauseButton = getByRole('button', { name: 'Pause' })
        const time = getByText('05:00')

        expect(startButton).toBeInTheDocument();
        expect(resetButton).toBeInTheDocument();
        expect(pauseButton).toBeInTheDocument();
        expect(time).toBeInTheDocument();
    })
})