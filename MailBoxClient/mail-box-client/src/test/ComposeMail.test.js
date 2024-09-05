import { render, screen, fireEvent } from '@testing-library/react';
import ComposeMail from '../components/ComposeMail';

jest.mock('react-draft-wysiwyg', () => ({
  Editor: () => <div>Editor</div>,
  EditorState: {
    createEmpty: jest.fn(() => ({ getCurrentContent: jest.fn(() => '') })),
  },
}));

test('renders ComposeMail form and interacts with it', () => {
  render(<ComposeMail />);

  // Check if "To" input exists
  const toInput = screen.getByPlaceholderText('Recipients');
  expect(toInput).toBeInTheDocument();


  // Check if the editor renders
  const editor = screen.getByText('Editor');
  expect(editor).toBeInTheDocument();
  
  fireEvent.change(toInput, { target: { value: 'test@example.com' } });

});
