import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => {
    return (
        <button className={classes.button}>
            <span className={classes.icon}><CartIcon /></span>
            <span className={classes.badge}>Your Cart</span>
        </button>
    );
}
export default HeaderCartButton