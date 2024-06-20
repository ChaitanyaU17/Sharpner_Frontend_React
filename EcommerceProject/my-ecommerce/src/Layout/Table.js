import { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import CartContext from '../context_store/Cart_Context';

export const TableComponent = (props) => {
const ctx = useContext(CartContext);
  return (
    <div>
      <Table responsive="sm" className="table-bordered">
        {props.children}
        <tbody>
          {props.data.map((ele, index) => (
            <tr key={index}>
              <td className="w-25">
                <img src={ele.imageUrl} className="img-fluid" alt="product" />
              </td>
              <td className="text-center">{ele.title}</td>
              <td className="text-center">
                <span
                  style={{ border: "1px solid black", margin: "0px 5px", padding: '0px 3px', cursor: 'pointer'  }}
                  onClick={() => ctx.addItem(ele)}
                >
                  +
                </span>
                {ele.quantity}
                <span
                  style={{ border: "1px solid black", margin: "0px 5px", padding: '0px 5px', cursor: 'pointer'  }}
                  onClick={() => ctx.removeItem(ele)}
                >
                  -
                </span>
              </td>
              <td className="text-center">${ele.price}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}>Total Amount</td>
            <td>${props.amount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
