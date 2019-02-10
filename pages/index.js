import axios from "axios";

import WooApi from "../constants/api";
import Products from "../components/products";

const IndexPage = ({ products }) => (
  <main>
    <Products products={products} />
  </main>
);

IndexPage.getInitialProps = async () => {
  const products = await axios.get(
    `${WooApi.url.wc}products?per_page=100&consumer_key=${
      WooApi.keys.consumerKey
    }&consumer_secret=${WooApi.keys.consumerSecret}`
  );
  return {
    products: products.data
  };
};

export default IndexPage;
