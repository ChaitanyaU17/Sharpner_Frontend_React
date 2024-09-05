import Signup from "../components/Signup";
import { render, screen } from '@testing-library/react';

test('renders Signup component with email, password, and confirm password fields', () => {
    render(<Signup />);
    
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Signup/i })).toBeInTheDocument();
  });
  