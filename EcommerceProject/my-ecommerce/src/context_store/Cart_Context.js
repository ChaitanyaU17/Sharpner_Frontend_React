import React, { useContext, useEffect, useState, useCallback } from "react";
import AuthContext from "./AuthContext";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: item => {},
  removeItem: id => {}
});

export const CartContextProvider = props => {
  const authCtx = useContext(AuthContext);
  const [itemState, setItemState] = useState([]);

  const getData = useCallback(() => {
    fetch(`https://crudcrud.com/api/da08b0e4e8c5474fa9638c1691155fa2/Cart`)
      .then(res => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then(data => {
        const filterdetail = data.filter(
          user => user.email === authCtx.useremail
        );
        setItemState(filterdetail);
      })
      .catch(err => setItemState([]));
  }, [authCtx.useremail]);

  useEffect(() => {
    getData();
  }, [getData]);

  const addItemHandler = async newItem => {
    const found = itemState.find(element => element.id === newItem.id);
    if (found) {
      const response = await fetch(
        `https://crudcrud.com/api/da08b0e4e8c5474fa9638c1691155fa2/Cart/${found._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            id: found.id,
            title: found.title,
            imageUrl: found.imageUrl,
            price: found.price,
            email: found.email,
            quantity: found.quantity + 1
          })
        }
      );
      if (response) {
        getData();
      }
    } else {
      const response = await fetch(
        "https://crudcrud.com/api/da08b0e4e8c5474fa9638c1691155fa2/Cart",
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            id: newItem.id,
            quantity: 1,
            email: authCtx.useremail,
            ...newItem
          })
        }
      );
      const data = await response.json();
      if (data) {
        getData();
      }
    }
  };

  const removeItemHandler = async ele => {
    if (ele.quantity - 1 === 0) {
      await fetch(
        `https://crudcrud.com/api/da08b0e4e8c5474fa9638c1691155fa2/Cart/${ele._id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json"
          }
        }
      );
    } else {
      await fetch(
        `https://crudcrud.com/api/da08b0e4e8c5474fa9638c1691155fa2/Cart/${ele._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            id: ele.id,
            title: ele.title,
            imageUrl: ele.imageUrl,
            price: ele.price,
            email: ele.email,
            quantity: ele.quantity - 1
          })
        }
      );
    }
    getData();
  };

  const totalAmount = itemState.reduce((curr, item) => {
    return curr + item.price * item.quantity;
  }, 0);

  const contextValue = {
    items: itemState,
    totalAmount: totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
