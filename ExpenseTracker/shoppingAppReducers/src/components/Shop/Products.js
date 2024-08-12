import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {id: 'p1', price: 6, title: 'My First Book', description: 'the first book i ever wrote' },
  {id: 'p2', price: 7, title: 'My Second Book', description: 'its amaizing experience' },
  {id: 'p3', price: 4, title: 'My Third Book', description: 'i recently wrote this' },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
           <ProductItem
           title={product.title}
           price={product.price}
           description={product.description}
           key={product.id}
           id={product.id}
         />
        ))}
       
      </ul>
    </section>
  );
};

export default Products;
