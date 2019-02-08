const Products = ({ products }) => (
  <section
    style={{
      display: "flex",
      flexWrap: "wrap"
    }}
  >
    {products.map(product => (
      <div
        key={product.id}
        style={{
          maxWidth: 280,
          padding: 10
        }}
      >
        <h3>{product.name}</h3>
        <img
          style={{
            maxWidth: 280
          }}
          src={product.images[0].src}
          alt={`${product.name} featured image`}
        />
      </div>
    ))}
  </section>
);

Products.getInitialProps = async ({ req }) => {
  const products = await axios.get(
    `${WooApi.url.wc}products?consumer_key=${
      WooApi.keys.consumerKey
    }&consumer_secret=${WooApi.keys.consumerSecret}`
  );
  return {
    products: products.data
  };
};

export default Products;
