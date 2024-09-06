import React from 'react';

const sentContext = React.createContext({
    mailList: [],
    setMailList: () => {},
});

export default sentContext;