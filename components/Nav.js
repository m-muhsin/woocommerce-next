import Link from "next/link";
import NavStyles from "./styles/NavStyles";

const Nav = () => (
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
      <a>Cart</a>
    </Link>
  </NavStyles>
);

export default Nav;
