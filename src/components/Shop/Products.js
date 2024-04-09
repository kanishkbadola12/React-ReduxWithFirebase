import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 1,
    price: 6,
    title: 'My first cart item',
    description: 'First cart item desc.'
  },
  {
    id: 2,
    price: 5,
    title: 'My second cart item',
    description: 'Second cart item desc.'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          )
        })}

      </ul>
    </section>
  );
};

export default Products;
