import Link from "next/link";
import axios from "axios";

import WooApi from "../constants/api";
import Header from "../components/header";
import Products from "../components/products";

const IndexPage = ({ products }) => (
  <main>
    <Header />
    <Products products={products} />
  </main>
);

IndexPage.getInitialProps = async () => {
  const products = await axios.get(
    `${WooApi.url.wc}products?consumer_key=${
      WooApi.keys.consumerKey
    }&consumer_secret=${WooApi.keys.consumerSecret}`
  );
  return {
    products: products.data
  };
};

export default IndexPage;
