import { useEffect, useState } from "react";

const IndexPage = () => {

	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const cart = localStorage.getItem('WOOCOMMERCE_NEXT_CART');
		const cartObj = JSON.parse(cart);
		setTotal(cartObj.products.reduce((acc, product) => acc + product.price * product.quantity, 0));
		setProducts(cartObj.products)
	}, [])

	const removeFromCart = (productId) => {
		console.log('remove from cart', productId);
		const cart = localStorage.getItem('WOOCOMMERCE_NEXT_CART');
		const cartObj = JSON.parse(cart);
		const productsArray = cartObj.products;
		const productIndex = productsArray.findIndex(p => p.id === productId);
		if (productIndex > -1) {
			productsArray.splice(productIndex, 1);
		}
		cartObj.products = productsArray;
		localStorage.setItem('WOOCOMMERCE_NEXT_CART', JSON.stringify(cartObj));
		setTotal(cartObj.products.reduce((acc, product) => acc + product.price * product.quantity, 0));
		setProducts(cartObj.products)
	}

	return (
		<main>
			<h1>Cart</h1>
			{products.length ? (
				<>
					<div>
						{products.map(product => (
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
