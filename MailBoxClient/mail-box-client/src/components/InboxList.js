import React from 'react'
import { Badge, Button, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import fetchMail from '../hooks/useFetch';
import { inboxActions } from '../store/inboxSlice';

const InboxList = () => {
    const dispatch = useDispatch();
    const mails = useSelector(state => state.inbox.mails);

    const mailDeleteHandler = async (id) => {
        const email = localStorage.getItem('email');
        await fetch(
            `${process.env.REACT_APP_DATABASE_URL}/received${email}/${id}.json`,
            {
                method: "DELETE",
            }
        );
        const data = await fetchMail(email, "received");
        dispatch(inboxActions.setInbox(data));
    };

    const unreadBadge = (read) => {
        if (!read) {
            return (
                <Badge pill variant='primary'>
                    Unread
                </Badge>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <h2 className='text-center'>Inbox</h2>
            <Container>
                <ListGroup className='text-center'>
                    {
                        mails.map((item) => {
                            try {
                                return (
                                    <ListGroup.Item key={item[0]}>
                                        <NavLink
                                            style={{ textDecoration: 'inherit' }}
                                            to={`inbox/${item[0]}`}
                                        >
                                            <ListGroup>
                                                <ListGroup.Item variant='primary'>
                                                    {unreadBadge(item[1].read)} From: {item[1].from}
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Subject: {item[1].header}{" "}
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </NavLink>
                                        <ListGroup.Item>
                                            <Button
                                                className='position-relative end-0'
                                                onClick={mailDeleteHandler.bind(null, item[0])}
                                            >
                                                Delete
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup.Item>
                                );
                            } catch (error) {
                                console.log(error);
                                return null; // Return null in case of error
                            }
                        })
                    }
                </ListGroup>
            </Container>
        </>
    );
};

export default InboxList;
