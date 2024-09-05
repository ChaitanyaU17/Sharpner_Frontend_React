import { screen, render, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

test('prevents form submission when fields are empty', () => {
    render(<Login/>);
  
    fireEvent.click(screen.getByRole('button', { name: /LogIn/i }));
  
    expect(screen.getByLabelText(/Email/i).value).toBe('');
    expect(screen.getByLabelText(/Password/i).value).toBe('');
  });
  