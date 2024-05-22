import { Fragment, useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './utils/CartProvider';

function App() {

const [cartIsShown, setCartIsShown] = useState();

const showCartHandler = () => {
  setCartIsShown(true);
}

const hideCartHandler = () => {
  setCartIsShown(false);
}

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <CartProvider>
      <Header onShowCart={ showCartHandler } />
      <main>
        <Meals />
      </main>
      </CartProvider>
    </Fragment>
  );
}

export default App;
