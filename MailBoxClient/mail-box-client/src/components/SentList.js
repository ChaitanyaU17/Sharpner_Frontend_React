import React from 'react'
import { Button, Container, ListGroup, NavLink } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import fetchMail from '../hooks/useFetch';
import { sentActions } from '../store/sentSlice';

const SentList = () => {
    const dispatch = useDispatch();

    const mails = useSelector(state => state.sent.mails);

    const deleteMailHandler = async (id) => {
        const email = localStorage.getItem('email');
        await fetch(
            `${process.env.REACT_APP_DATABASE_URL}/sent${email}/${id}.json`,
            {
                method: 'DELETE',
            }
        );
        const data = await fetchMail(email, "sent");
        dispatch(sentActions.setSent(data));
    };

  return (
    <>
    <h2 className='text-center'>Sent</h2>
    <Container>
        <ListGroup className='text-center'>
            {
                mails.map((item) => {
                    try {
                        return (
                            <ListGroup.Item key={item[0]}>
                                <NavLink style={{textDecoration: "inherit"}}
                                to={`sent/${item[0]}`}>
                                    <ListGroup>
                                        <ListGroup.Item variant="primary">
                                            To:{" "}
                                            {item[1].to.map((item) => (
                                                <span>{item}</span>
                                            ))}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Subject: {item[1].header}{" "}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </NavLink>
                                <ListGroup.Item>
                                    <Button
                                    className='position-relative end-0'
                                    onClick={deleteMailHandler.bind(null, item[0])}
                                    >
                                        Delete
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup.Item>
                        );
                    } catch (error) {
                        console.log(error);
                    }
                })
            }
        </ListGroup>
    </Container>
    </>
  );
};

export default SentList;
