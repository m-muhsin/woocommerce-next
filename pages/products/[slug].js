import Link from "next/link";
import axios from "axios";
import styled from "styled-components";
import { isEmpty, isArray } from 'lodash';
import WooApi from "../../constants/api";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImgContainer = styled.div`
  padding-right: 15px;
  @media (min-width: 992px) {
    width: 65%;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Description = styled.div`
  @media (min-width: 992px) {
    width: 35%;
  }
`;

const Price = styled.span`
  font-size: 2em;
`;

const Product = ({ product }) => {
    {
        return product !== undefined ? (
            <>
                <h1>{product.name}</h1>
                <Row>
                    <ImgContainer>
                        <Img
                            src={product.images ? product.images[0].src : ""}
                            alt={product.name}
                        />
                    </ImgContainer>
                    <Description>
                        <Price>$ {product.price}</Price>
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </Description>
                </Row>
            </>
        ) : (
            <div>
                <h1>404</h1>
                <p>Sorry, the product you were looking for was not found!</p>
                <Link href="/">
                    <a className="link">Go back to homepage!</a>
                </Link>
            </div>
        );
    }
};

export async function getStaticProps({ params }) {
    const { slug } = params;
    const url = `${WooApi.url.wc}products?slug=${slug}&consumer_key=${WooApi.keys.consumerKey
        }&consumer_secret=${WooApi.keys.consumerSecret}`;
    const response = await axios.get(url);

    return {
        props: {
            product: response.data[0] || {}
        },
        revalidate: 1
    };

};

export async function getStaticPaths() {

    const url = `${WooApi.url.wc}products?per_page=100&_fields=slug&consumer_key=${WooApi.keys.consumerKey}&consumer_secret=${WooApi.keys.consumerSecret}`;
console.log('url', url)
    const products = await axios.get(url);

    const pathsData = [];

    !isEmpty(products) && isArray(products) &&
        products.map((product) => {
            if (!isEmpty(product?.slug)) {
                pathsData.push({ params: { slug: `${product?.slug}` } });
            }
        });

    return {
        paths: pathsData,
        fallback: 'blocking'
    };
}


export default Product;
