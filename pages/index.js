import Products from "../components/products";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: process.env.WOO_URL,
  consumerKey: process.env.WOO_KEY,
  consumerSecret: process.env.WOO_SECRET,
  version: "wc/v3"
});

const IndexPage = ({ products }) => (
  <main>
    <Products products={products} />
  </main>
);

export async function getStaticProps() {

  const products = await api.get("products",
    {
      per_page: 100,
      fields: ["id", "name", "slug", "images", "price", "regular_price"]
    }
  )

  return {
    props: {
      products: products.data
    }
  };
};

export default IndexPage;
