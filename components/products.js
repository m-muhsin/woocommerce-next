import Link from "next/link";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Single = styled.div`
  width: 300px;
  margin: 10px;
`;

const Img = styled.img`
  width: 280px;
  height: 280px;
`;

const Products = ({ products }) => (
  <Section>
    {products.map(product => (
      <Single key={product.id}>
        <Link
          href={`/product?slug=${product.slug}`}
          as={`/products/${product.slug}`}
        >
          <a>
            <h3>{product.name}</h3>
            <Img
              src={product.images[0].src}
              alt={`${product.name} featured image`}
            />
          </a>
        </Link>
      </Single>
    ))}
  </Section>
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
