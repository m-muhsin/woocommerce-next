import { useEffect, useState, useContext } from "react";
import { AppContext } from '../components/context/AppContext';

const IndexPage = () => {

	const [cart, addToCart, removeFromCart] = useContext(AppContext);
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setTotal(cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0));
		setProducts(cart.products)
	}, [])

	return (
		<main>
			<h1>Cart</h1>
			{products.length ? (
				<>
					<div>
						{cart.products.map(product => (
							<div key={product.id}>
								<button style={{
									background: 'none',
									border: 'none',
									cursor: 'pointer',
									fontSize: '20px'
								}}
									onClick={() => removeFromCart(product.id)}>
									&times;
								</button>
								<div>{product.name}</div>
								<img style={{
									width: '100px',
									height: '100px',
									objectFit: 'cover'

								}} src={product.images[0].src} alt={product.name} />
								<div>{product.quantity}</div>
								<div>${product.price}</div>
							</div>
						))}
					</div>
					<div>Total: ${total}</div>
				</>
			) : (
				<div>Cart is empty</div>
			)}


		</main>
	)
};

export default IndexPage;
