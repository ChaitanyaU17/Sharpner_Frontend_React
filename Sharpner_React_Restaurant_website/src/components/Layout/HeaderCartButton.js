import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = ( props ) => {
    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span className={classes.badge}>Your Cart</span>
        </button>
    );
}
export default HeaderCartButton;