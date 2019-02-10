import axios from "axios";
import WooApi from "../constants/api";

const Product = ({ product }) => (
  <div>
    <h1>{product.name}</h1>
    <p>Welcome to our product page for {product.slug}!</p>
  </div>
);

Product.getInitialProps = async ({ query }) => {
  const url = `${WooApi.url.wc}products?slug=${query.slug}&consumer_key=${
    WooApi.keys.consumerKey
  }&consumer_secret=${WooApi.keys.consumerSecret}`;
  const response = await axios.get(url);
  return { product: response.data[0] };
};

export default Product;
