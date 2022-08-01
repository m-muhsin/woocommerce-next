import React, { useState, useEffect } from 'react';

export const AppContext = React.createContext(undefined);

const defaultState = {
    products: [],
};

export const AppProvider = (props) => {
    const [cart, setCart] = useState(defaultState);

    useEffect(() => {
        if (process.browser) {
            let cartData = localStorage.getItem('WOOCOMMERCE_NEXT_CART');
            cartData = null !== cartData ? JSON.parse(cartData) : '';
            setCart(cartData);
        }
    }, []);

    const addToCart = (productParam) => {
        const product = JSON.parse( JSON.stringify( productParam ) );
        if (cart) {
            const cartObj = JSON.parse( JSON.stringify( cart) );
            if (cartObj.products) {
                const products = cartObj.products;
                const productId = product.id;
                const productIndex = products.findIndex(p => p.id === productId);
                if (productIndex > -1) {
                    products[productIndex].quantity++;
                } else {
                    product.quantity = 1;
                    products.push(product);
                }
                cartObj.products = products;
                setCart(cartObj);
                localStorage.setItem('WOOCOMMERCE_NEXT_CART', JSON.stringify(cartObj));
            } else {
                product.quantity = 1;
                cartObj.products = [product];
                setCart(cartObj);
                localStorage.setItem('WOOCOMMERCE_NEXT_CART', JSON.stringify(cartObj));
            }
        } else {
            product.quantity = 1;
            const cartObj = {
                products: [product]
            };
            setCart(cartObj);
            localStorage.setItem('WOOCOMMERCE_NEXT_CART', JSON.stringify(cartObj));
        }
    };

    const removeFromCart = (productId) => {
        const cartObj = JSON.parse( JSON.stringify( cart ) );
        const productsArray = cartObj.products;
        const productIndex = productsArray.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            productsArray.splice(productIndex, 1);
        }
        cartObj.products = productsArray;
        localStorage.setItem('WOOCOMMERCE_NEXT_CART', JSON.stringify(cartObj));
        setCart(cartObj);
    };


    return (
        <AppContext.Provider value={[cart, addToCart, removeFromCart]}>
            {props.children}
        </AppContext.Provider>
    );
};
