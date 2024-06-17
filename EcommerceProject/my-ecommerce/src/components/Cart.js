import { Button, Offcanvas } from "react-bootstrap";
import { TableComponent } from '../Layout/Table'
import CartContext from "../context_store/Cart_Context";
import { useContext } from "react";
const Cart = props => {
  const ctx = useContext(CartContext);
  
  return (
    <Offcanvas show={props.show} onHide={props.handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <TableComponent data={ctx.items} amount={ctx.totalAmount}>
        <thead>
          <tr>
            <th className="text-center">Image</th>
            <th className="text-center">Title</th>
            
            <th className="text-center">Quantity</th>
            <th className="text-center">Price</th>
            </tr>
        </thead>
        </TableComponent>
        <Button variant="info" className="w-100" >PURCHASE</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Cart;
