import { API } from "../../apiRoutes";
import {useContext} from 'react';
import CartContext from "../../Contexts/CartContext";
import { Link } from "react-router-dom";


function CartProductCard({product}) {
  const cartCtx = useContext(CartContext);

  return (
    <>
    <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                            <div className="w-full lg:w-2/5 xl:w-2/4">
                                <figure className="flex leading-5">
                                    <div>
                                        <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                            <img src={API.imagePath + product.images[0]} alt="Title"/>
                                        </div>
                                    </div>
                                    <figcaption className="ml-3">
                                        <p><Link to={'/product/'+product.id} className="hover:text-blue-600">{product.product_name}</Link></p>
                                        <p className="mt-1 text-gray-400"> Size: {product.size}, Color: {product.color} </p>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="">
                              <span>
                              <button onClick={() => {cartCtx.remove(product,product.stock_id)}}className="px-4 py-2 font-bold inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100">-</button>
                               <span className="m-3">{product.quantity}</span>
                              <button disabled={product.quantity >= product.quantity_in_stock}  onClick={() => {cartCtx.add(product,product.stock_id)}} className="px-4 py-2 font-bold inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100">+</button>
                              </span>
                            </div>
                            <div>
                                <div className="leading-5">
                                    <p className="font-semibold not-italic"> {(product.total_price * product.quantity).toFixed(2)}$ </p>
                                    <small className="text-gray-400"> {product.total_price}$ / per item </small>
                                    <p>
                                   {product.total_price < product.product_price && <s><small className="text-red-400"> {product.product_price}$ / per item </small></s>}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-auto">
                                <div className="float-right">
                                    <button onClick={() => {cartCtx.delete(product,product.stock_id)}} className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100">Delete <i className="fa fa-trash" aria-hidden="true"></i>
</button>
                                </div>
                            </div>
                        </div> 

                        <hr className="my-4"/>
    </>
  );

}

export default CartProductCard