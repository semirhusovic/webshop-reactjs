import React, { useState, createContext, useEffect,useContext } from 'react';
import AuthContext from './AuthContext';
import { API } from '../apiRoutes';


const CartContext = createContext();


export const CartProvider = (props) => {
  const authCtx = useContext(AuthContext);


  const cartItemsFromLS = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const [cartItems, setCartItems] = useState(cartItemsFromLS);
  const [updated,setUpdated] = useState(0);

  const handleAdd = (product) => {
    if(authCtx.isLoggedIn) {
      // req za dodavanje
      const addedProduct = fetch(API.url  + 'cart-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            console.log('greska')
          } else {
            setUpdated(updated +1);
            console.log('radi')
          }
        })
        .catch((error) => console.log(error));
      // req za dodavanje
    } else {
      const exists = cartItems.find((x) => x.id === product.id);
    if (exists) {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exists, pivot : {quantity: exists.pivot.quantity+1}} : x))
      );
    } else {
      setCartItems([...cartItems, { ...product, pivot : {quantity: 1} }]);
    }
    }

  };

  const handleRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.pivot.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exist,pivot : {quantity: exist.pivot.quantity-1}} : x))
      );
    }
  };


  const handleDelete = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }
  };

  const ContextValue = {
    add: handleAdd,
    remove: handleRemove,
    delete: handleDelete,
    cartState: [cartItems, setCartItems]
  };

  useEffect(() => {
    if(authCtx.isLoggedIn) {
      const cartItemsFromDB = fetch(API.url  + 'get-user-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log('greska')
          } else {
              setCartItems(data);
              // setCartItems(data)
            // console.log(radi));
          }
        })
        .catch((error) => console.log(error));
        // console.log(cartItems);
    } else { 
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    console.log(cartItems)
  }, [updated]);

  return <CartContext.Provider value={ContextValue}>{props.children}</CartContext.Provider>;
};

export default CartContext;