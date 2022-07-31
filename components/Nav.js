import { useState, useEffect } from 'react';
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import styled from 'styled-components'

const Badge = styled.span`
    line-height: 16px;
    background: red;
    color: white;
    border-radius: 99px;
    padding: 5px;
    position: absolute;
    top: 18px;
    right: 6px;
    font-size: 16px;
  `;

const Nav = () => {

  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {

    const cart = JSON.parse(localStorage.getItem('WOOCOMMERCE_NEXT_CART'));

    setCartCount(cart && cart.products ? cart.products.length : 0);
  }, []);
  return (
    <NavStyles>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <Link href="/order">
        <a>Order</a>
      </Link>
      <Link href="/me">
        <a>Account</a>
      </Link>
      <Link href="/cart">
        <>
          <a>
            Cart
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </a>

        </>
      </Link>
    </NavStyles>
  )
};

export default Nav;
