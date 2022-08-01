import Link from "next/link";
import axios from "axios";
import styled from "styled-components";
import { isEmpty, isArray } from 'lodash';
import WooApi from "../../constants/api";
import { useContext } from "react";
import { AppContext } from "../../components/context/AppContext";

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

const Price = styled.div`
  font-size: 2em;
`;

const AddToCart = styled.button`
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 10px 0;
    cursor: pointer;

    &:hover {
        background: #333;
    }

    &:focus {
        outline: none;
    }

    &:active {
        background: #000;
    }
`;

const Product = ({ product = {} }) => {

    const [cart, addToCart] = useContext(AppContext);
    const price = Number(product.price);
    const regularPrice = Number(product.regular_price);

    const isOnSale = price < regularPrice;

    const priceRender = isOnSale ? (
        <div>
            <span style={{ textDecoration: 'line-through', color: 'gray' }}>${regularPrice}</span>{` `}
            <span>${price}</span>
        </div>
    ) : (
        <div>${price}</div>
    );


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
                        <Price>{priceRender}</Price>
                        <AddToCart onClick={() => addToCart(product)}>Add to cart</AddToCart>
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
    const url = `${WooApi.url.wc}products?slug=${slug}&per_page=1&_fields=id,name,description,images,price,regular_price&consumer_key=${WooApi.keys.consumerKey
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

    const products = await axios.get(url);
    const productSlugs = products.data;

    const pathsData = [];

    !isEmpty(productSlugs) && isArray(productSlugs) &&
        productSlugs.map((product) => {
            if (!isEmpty(product?.slug)) {
                pathsData.push({ params: { slug: `${product?.slug}` } });
            }
        });

    return {
        paths: pathsData,
        fallback: true
    };
}


export default Product;
