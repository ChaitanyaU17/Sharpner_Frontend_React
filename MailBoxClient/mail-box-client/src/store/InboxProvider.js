import React, { useState } from "react";
import InboxContext from "./inboxContext";

const InboxProvider = (props) => {
    const [mails, setMails] = useState([]);

    const setMailHandler = (mailList) => {
        setMails(mailList);
    };

    const inboxProvider = {
        mailList: mails,
        setMailList: setMailHandler,
    };

    return (
        <InboxContext.Provider value={inboxProvider}>
            {props.children}
        </InboxContext.Provider>
    );
};

export default InboxProvider;