import React, { useState } from 'react';
import sentContext from './sentContext';

const SentProvider = (props) => {
    const [mails, setMails] = useState([]);

    const setMailsHandler = (mailList) => {
        setMails(mailList);
    };

    const sentProvider = {
        mailList: mails,
        setMailList: setMailsHandler,
    };

    return (
        <sentContext.Provider value={sentProvider}>
            {props.children}
        </sentContext.Provider>
    );
};


export default SentProvider;