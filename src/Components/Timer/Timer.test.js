import React from 'react';
import { screen, render, fireEvent} from '@testing-library/react'
import CountdownTimer from './Timer'

describe('Timer', () => {
    it('Should have the correct content when rendered', () => {
        render(<CountdownTimer />)

        const startButton = screen.getByRole('button', { name: 'Start' })
        const resetButton = screen.getByRole('button', { name: 'Reset' })
        const pauseButton = screen.getByRole('button', { name: 'Pause' })
        const time = screen.getByText('05:00')

        expect(startButton).toBeInTheDocument();
        expect(resetButton).toBeInTheDocument();
        expect(pauseButton).toBeInTheDocument();
        expect(time).toBeInTheDocument();
    })
})