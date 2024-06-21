import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context_store/Cart_Context";
const GenricsCard = (props) => {
  const ctx = useContext(CartContext);
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ border: "none" }}>
        <Card.Header
          className="text-center bg-white text-black"
          style={{ fontSize: "17px", fontWeight: '500', borderBottom: "1px solid black" }}
        >
          {props.title}
        </Card.Header>
        <Card.Body>
          <Link to={`/product-detail/${props.id}`}>
            <Card.Img className=" h-50 " src={props.imageUrl} />
          </Link>
          <Card.Text className="text-center">Price: $ {props.price}</Card.Text>

          <Button
            className="w-100 opacity-75"
            variant="info"
            onClick={() => ctx.addItem(props)}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GenricsCard;
