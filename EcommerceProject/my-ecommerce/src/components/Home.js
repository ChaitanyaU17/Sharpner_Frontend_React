import React from 'react';
import { Button, Table } from 'react-bootstrap';

const Home = () => {
  const data = [
    { date: "JULY 16", place: "DETROIT, MI", address: "DTE ENERGY MUSIC THEATRE" },
    { date: "JULY 17", place: "DETROIT, MI", address: "BUDWEISER STAGE" },
    { date: "JULY 18", place: "DETROIT, MI", address: "JIGGY LUBE LIVE" },
    { date: "JULY 19", place: "DETROIT, MI", address: "AK-CHIN PAVILION" },
    { date: "JULY 20", place: "DETROIT, MI", address: "T-MOBILE ARENA" },
<<<<<<< HEAD
    { date: "JULY 20", place: "DETROIT, MI", address: "CONCORD PAVILION" },
=======
>>>>>>> 07d4ed887a16f52ce0e1828cd7ff90e7980a49f0
  ];

  return (
    <div>
      <h1 className='text-center'>Tours</h1>
      <Table bordered hover>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.place}</td>
              <td>{item.address}</td>
              <td><Button variant="info">BUY TICKETS</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
