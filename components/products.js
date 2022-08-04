import Link from "next/link";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Single = styled.div`
  width: 300px;
  margin: 1em auto;
`;

const Title = styled.h3`
  margin: 0;
`;

const Img = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
`;

const Price = styled.div`
  font-size: 1em;
`;

const RegularPrice = styled.span`
  text-decoration: line-through
`;

const Products = ({ products = [] }) => {

  // Products without a price should go last.
  products = products.sort((a, b) => {
    if (a.price && !b.price) {
      return -1;
    } else if (!a.price && b.price) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <Section>
      {products.map(product => (
        <Single key={product.id}>
          <Link href={`/products/${product.slug}`}>
            <a>
              <Img
                src={product.images[0].src}
                alt={`${product.name} featured image`}
              />
              <Title>{product.name}</Title>
              {
                product.price && (
                  <Price>
                    {product.price && product.regular_price &&
                      product.price < product.regular_price ?
                      (
                        <>
                          <RegularPrice>
                            ${product.regular_price}
                          </RegularPrice>{' '}
                          <span>
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span>${product.price}</span>
                      )}
                  </Price>
                )
              }
            </a>
          </Link>
        </Single>
      ))}
    </Section>
  )
}

export default Products;
