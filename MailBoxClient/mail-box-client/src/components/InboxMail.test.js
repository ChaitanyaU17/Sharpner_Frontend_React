import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import InboxMail from './InboxMail';
import store from '../store/store';

test('renders mail content correctly', () => {
  
  const mockMails = [
    ['mailId123', { from: 'test@example.com', header: 'Test Subject', content: JSON.stringify({
      blocks: [
        {
          key: '5g7i9',
          text: 'Test content of the mail',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    }), read: true }]
  ];

  // Mock the Redux state
  const mockState = {
    inbox: {
      mails: mockMails,
    },
  };

  // Mock useSelector
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation((selector) => selector(mockState)),
  }));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <InboxMail />
      </BrowserRouter>
    </Provider>
  );

  // Check that the email content is rendered
  expect(screen.getByText('From: test@example.com')).toBeInTheDocument();
  expect(screen.getByText('Subject: Test Subject')).toBeInTheDocument();
  expect(screen.getByText('Test content of the mail')).toBeInTheDocument();
});
