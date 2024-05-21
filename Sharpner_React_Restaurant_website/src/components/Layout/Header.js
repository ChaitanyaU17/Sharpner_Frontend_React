import { Fragment } from 'react';
import classes from './Header.module.css';
import mealsImg from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = ( props ) => {
    return (
        <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={ props.onShowCart } />
        </header>
        <div className={classes['meal_img']}>
            <img src={mealsImg} alt='meal food' />
        </div>
        </Fragment>
    );
}
export default Header;