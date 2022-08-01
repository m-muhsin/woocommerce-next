import { useState, useContext, useEffect } from 'react';
import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import styled from 'styled-components'
import {AppContext} from './context/AppContext';

const Badge = styled.span`
    line-height: 12px;
    background: red;
    color: white;
    border-radius: 99px;
    padding: 5px;
    position: absolute;
    top: 18px;
    right: 6px;
    font-size: 16px;
    width: 24px;
    height: 24px;
    text-align: center;
  `;

const Nav = () => {

  const [cart] = useContext(AppContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {

    setCartCount(cart && cart.products ? cart.products.reduce((acc, product) => product.quantity + acc, 0) : 0);

  }, [cart]);

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
        <a>
          Cart
          {cartCount > 0 && <Badge>{cartCount}</Badge>}
        </a>
      </Link>
    </NavStyles>
  )
};

export default Nav;
