import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import InboxMail from '../components/InboxMail';
import store from '../store/store';

describe('InboxMail Component', () => {
  
  // Test Case 1: Render Mail Details Properly
  it('renders mail details (From, Subject, Content)', () => {
    const mockMails = [
      ['1', { from: 'test@example.com', header: 'Test Subject', content: '{"blocks":[{"text":"Test Content"}],"entityMap":{}}', read: false }]
    ];

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/inbox/1']}>
          <Routes>
            <Route path="/inbox/:mailId" element={<InboxMail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/From:/i)).toHaveTextContent('test@example.com');
    expect(screen.getByText(/Subject:/i)).toHaveTextContent('Test Subject');
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });

  // Test Case 2: Mark Mail as Read
  it('marks mail as read after opening', () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({}),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/inbox/1']}>
          <Routes>
            <Route path="/inbox/:mailId" element={<InboxMail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('received'), 
      expect.objectContaining({ method: 'PUT' })
    );

    mockFetch.mockRestore();
  });

  // Test Case 3: Load Correct Content in Editor
  it('loads mail content into the Draft.js editor', () => {
    const mockMails = [
      ['1', { content: '{"blocks":[{"text":"Test Content"}],"entityMap":{}}', read: true }]
    ];

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/inbox/1']}>
          <Routes>
            <Route path="/inbox/:mailId" element={<InboxMail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });

});


