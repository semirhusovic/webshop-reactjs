import React from 'react'
import { API } from '../apiRoutes'

function CheckoutCard({product}) {
  return (
    <figure className="flex items-center mb-4 leading-5">
    <div>
      <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
        <img width="70" height="70" src={API.imagePath + product.images[0]} alt="Title"/>
        <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full"> {product.quantity} </span>
      </div>
    </div>
    <figcaption className="ml-3">
      <p> {product.product_name} </p>
      <p className="mt-1 text-gray-400"> Total: ${product.quantity * product.total_price}</p>
    </figcaption>
  </figure>
  )
}

export default CheckoutCard