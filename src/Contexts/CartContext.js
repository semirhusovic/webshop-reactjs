import React, { useState, createContext, useEffect,useContext } from 'react';
import AuthContext from './AuthContext';
import { API } from '../apiRoutes';


const CartContext = createContext();


export const CartProvider = (props) => {
  const authCtx = useContext(AuthContext);


  const cartItemsFromLS = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const [cartItems, setCartItems] = useState(cartItemsFromLS);
  const [updated,setUpdated] = useState(0);

  const handleAdd = (product,stockId) => {
    if(authCtx.isLoggedIn) {
      // req za dodavanje
      const addedProduct = fetch(API.url  + 'cart-add/1/' + product.id + '/' + stockId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            console.log('greska',data.error)
          } else {
            setUpdated(updated + 1);
          }
        })
        .catch((error) => console.log(error));
    } else {
      const exists = cartItems.find((x) => x.id === product.id);
    if (exists) {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exists, quantity: exists.quantity+1} : x))
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1} ]);
    }
    }

  };

  const handleRemove = (product,stockId) => {
    if(authCtx.isLoggedIn) {
      // req za dodavanje
      const addedProduct = fetch(API.url  + 'cart-remove/1/' + product.id+'/'+stockId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      })
        .then((res) => {
          if (res.status == 204){
            setUpdated(updated + 1);
          }
        })
        .catch((error) => console.log(error));
      // req za dodavanje
    } else {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity-1} : x))
      );
    }
  }
  };


  const handleDelete = (product,stockId) => {
    if(authCtx.isLoggedIn) {
      const addedProduct = fetch(API.url  + 'cart-delete/1/'+ product.id+'/'+stockId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      })
        .then((res) => {
          if (res.status == 204){
            setUpdated(updated + 1);
          }
        })
        .catch((error) => console.log(error));
    } else {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    }}
  };

  const ContextValue = {
    add: handleAdd,
    remove: handleRemove,
    delete: handleDelete,
    cartState: [cartItems, setCartItems]
  };

  useEffect(() => {
    if(authCtx.isLoggedIn) {
      const cartItemsFromDB = fetch(API.url  + 'get-user-cart/1', {
        method: 'GET',
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
          }
        })
        .catch((error) => console.log(error));
    } else { 
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    // console.log(cartItems)
  }, [updated,authCtx.isLoggedIn]);

useEffect(()=>{
if(!authCtx.isLoggedIn) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
},[cartItems])

  return <CartContext.Provider value={ContextValue}>{props.children}</CartContext.Provider>;
};

export default CartContext;