import { fireEvent, render, screen } from '@testing-library/react';
import ForgetPassword from './ForgetPassword';
import { BrowserRouter } from 'react-router-dom';

describe('ForgetPassword component', () => {
    test('render posts if request is succeeds', async() => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async() => ({email: 'chaitanya34@gmail.com'})
        });

        render(
            <BrowserRouter>
            <ForgetPassword />
            </BrowserRouter>
        );

        const submitButton = screen.getByText(/reset/i);
        fireEvent.click(submitButton);
    })
})