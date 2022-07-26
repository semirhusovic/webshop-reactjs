import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../Contexts/CartContext';
import CartProductCard from './Layout/CartProductCard';

function Cart() {
  const [cartItems] = useContext(CartContext)['cartState'];
  const totalAmmout = cartItems.reduce((a, c) => a + c.pivot.quantity * c.productPrice, 0);
  const totalAmmoutDiscounted = cartItems.reduce((a, c) => a + c.pivot.quantity * c.total_price, 0);
  return (
    <>
    <section className="py-10">
        <div className="container max-w-screen-xl mx-auto px-4">

            <div className="flex flex-col md:flex-row gap-4">
                <main className="md:w-3/4">

                    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">

                    {cartItems.map((product) => (
                      <div key={product.id}>
                        {
                          <>
                            <CartProductCard product={product}></CartProductCard>
                          </>
                        }
                      </div>
                    ))}
                        
                        

                        <h6 className="font-bold">Free Delivery within 1-2 weeks</h6>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip</p>

                    </article> 

                </main>
                <aside className="md:w-1/4">

                    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">

                        <ul className="mb-5">
                            <li className="flex justify-between text-gray-600  mb-1">
                                <span>Total price:</span>
                                <span>${totalAmmout}</span>
                            </li>
                            <li className="flex justify-between text-gray-600  mb-1">
                                <span>Discount:</span>
                                {/* <span className="text-green-500">- $60.00</span> */}
                                <span className="text-green-500">-${Number(totalAmmout-totalAmmoutDiscounted).toFixed(2)}</span>
                            </li>
                            <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                                <span>Total price:</span>
                                <span>${Number(totalAmmoutDiscounted).toFixed(2)}</span>
                            </li>
                        </ul>

                        <a className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-teal-400 border border-transparent rounded-md hover:bg-teal-600" href="#"> Checkout </a>

                        <Link className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-teal-400 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100" to={'/'}> Back to shop </Link>

                    </article> 

                </aside>
            </div> 

        </div>
    </section>
    </>
  );
}

export default Cart;