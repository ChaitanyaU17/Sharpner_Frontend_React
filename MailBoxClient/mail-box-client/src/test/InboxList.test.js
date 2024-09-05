import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import InboxList from '../components/InboxList';
import store from '../store/store';

describe('InboxList Component', () => {

  // Test Case 1: Display Blue Dot for Unread Messages
  it('displays blue dot for unread messages', () => {
    const mockMails = [
      ['1', { from: 'test@example.com', header: 'Test Subject', read: false }],
      ['2', { from: 'another@example.com', header: 'Another Subject', read: true }]
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <InboxList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Unread/i)).toBeInTheDocument();
  });


  // Test Case 2: Show Correct Unread Message Count
  it('displays correct unread message count', () => {
    const mockMails = [
      ['1', { from: 'test@example.com', header: 'Test Subject', read: false }],
      ['2', { from: 'another@example.com', header: 'Another Subject', read: false }],
      ['3', { from: 'someone@example.com', header: 'Someone Subject', read: true }]
    ];

    render(
      <Provider store={store}>
        <MemoryRouter>
          <InboxList />
        </MemoryRouter>
      </Provider>
    );

    const unreadMessages = screen.getAllByText(/Unread/i);
    expect(unreadMessages.length).toBe(2);
  });

});
