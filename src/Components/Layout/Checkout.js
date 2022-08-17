import PaymentForm from "./PaymentForm";
import {useContext,useEffect} from 'react';
import CartContext from "../../Contexts/CartContext";
import CheckoutCard from "../CheckoutCard";
import CheckoutForm from "./CheckoutForm";


function Checkout() {
  const [cartItems] = useContext(CartContext)['cartState'];
  const totalAmmout = cartItems.reduce((a, c) => a + c.quantity * c.product_price, 0);
  const totalAmmoutDiscounted = cartItems.reduce((a, c) => a + c.quantity * c.total_price, 0);


  return (
<div className="container max-w-screen-xl mx-auto px-4 my-5">
{/* <script type="text/javascript" src="../../../js/payment.js" defer></script> */}
<div className="flex flex-col md:flex-row gap-4 lg:gap-8">
	<main className="md:w-2/3">

		<article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">

			<CheckoutForm />

			<hr className="my-4" />


      {/* <PaymentForm /> */}

		</article> 

	</main>
	<aside className="md:w-1/3">
		
      <article className="text-gray-600" style={{'maxWidth': '350px'}}>

<h2 className="text-lg font-semibold mb-3">Summary</h2>
<ul>
  <li className="flex justify-between mb-1"> 
    <span>Price:</span> 
    <span>${totalAmmout.toFixed(2)}</span>
  </li>
  <li className="flex justify-between mb-1"> 
    <span>Discount:</span> 
    <span className="text-green-500">-${Number(totalAmmout-totalAmmoutDiscounted).toFixed(2)}</span>
  </li>
  <li className="border-t flex justify-between mt-3 pt-3"> 
    <span>Total price:</span> 
    <span className="text-gray-900 font-bold">${totalAmmoutDiscounted.toFixed(2)}</span>
  </li>
</ul>

<hr className="my-4"/>


<h2 className="text-lg font-semibold mb-3">Items in cart</h2>

{cartItems.map((product)=>
<CheckoutCard key={product.id} product={product}/>
)}

      </article>

    </aside>
</div>
</div>
);
}

export default Checkout

