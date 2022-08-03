import axios from "axios";

import WooApi from "../constants/api";
import Products from "../components/products";

const IndexPage = ({ products }) => (
  <main>
    <Products products={products} />
  </main>
);

export async function getStaticProps() {

  const url = `${WooApi.url.wc}products?per_page=100&consumer_key=${process.env.WOO_KEY}&consumer_secret=${process.env.WOO_SECRET}`;
  const products = await axios.get(url);

  return {
    props: {
      products: products.data
    }
  };
};

export default IndexPage;
