import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import React, { useContext } from 'react';
import CartContext from "../../utils/cartContext";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext); // Access context

  const numberOfCartItems = cartCtx.items.length; // Get number of items
    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span className={classes.badge}>Your Cart <span className={classes.count}>{numberOfCartItems}</span></span>
        </button>
    );
}
export default HeaderCartButton;