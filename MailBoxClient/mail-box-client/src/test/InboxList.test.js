import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import InboxList from './InboxList';
import store from '../store/store';

test('renders Inbox title', () => {
    render(
        <Provider store={store}>
            <InboxList />
        </Provider>
    );

    const inboxTitle = screen.getByText(/Inbox/i);
    expect(inboxTitle).toBeInTheDocument();
});
