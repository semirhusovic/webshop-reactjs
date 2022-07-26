import { API } from "../apiRoutes";
import { Link } from "react-router-dom";
import {useContext} from 'react';
import CartContext from "../Contexts/CartContext";
import NoWorkResult from "postcss/lib/no-work-result";

function ProductCard({product}) {

  const cartCtx = useContext(CartContext);
  return (
    <article className="my-4">
      {product.discounts.length > 0 && product.total_price < product.productPrice &&
      <div class="product-discount">
        {/* <div class="discount-percent">{((product.total_price / product.productPrice)*100).toFixed(2)}%</div>  */}
        <div class="discount-percent">{(((product.productPrice - product.total_price) / product.productPrice)*100).toFixed(2)}%</div> 
        <div class="discount-date">{product.discounts[0].expired_at}</div>
      </div>}
      <Link to={'/product/'+product.id}
         className="rounded bg-gray-100 border border-gray-200 block relative p-1 hover:border-blue-300">
          <img src={API.imagePath + product.images[0].fileName}
               className="mx-auto mix-blend-multiply w-auto max-h-64" alt={product.productName} />
      </Link>
      <div className="pt-3">
          <button onClick={() => {cartCtx.add(product);}} className="float-right px-3 py-2 text-gray-400 border border-gray-300 rounded-md hover:border-teal-400 hover:text-teal-600">
              <i className="fa fa-shopping-cart"></i>
          </button>

          { Number(product.total_price) < Number(product.productPrice) ? (
          <p className="font-semibold">{product.total_price}$
            <del className="text-sm text-gray-500 line-through">{product.productPrice}$</del>
          </p>) : ( <p className="font-semibold">{product.productPrice}$</p>) }
            
      
          <h6>
              <a href="" className="text-gray-600 hover:text-blue-500">
                  {product.productName}
              </a>
          </h6>
          <small className="text-sm text-gray-400"> {product.productDescription.substring(0,120)+'...'}</small>
      </div>
  </article>
  );
}


export default ProductCard;