import { API } from "../apiRoutes";
import { Link } from "react-router-dom";
import {useContext} from 'react';
import CartContext from "../Contexts/CartContext";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function ProductCard({product}) {

  const cartCtx = useContext(CartContext);
  return (
    <article className="my-4">
      {product.discounts.length > 0 && product.total_price < product.productPrice &&
      <div className="product-discount">
        {/* <div class="discount-percent">{((product.total_price / product.productPrice)*100).toFixed(2)}%</div>  */}
        <div className="discount-percent">{(((product.product_price - product.total_price) / product.product_price)*100).toFixed(2)}%</div> 
        <div className="discount-date">{product.discounts[0].expired_at}</div>
      </div>}
      <Link to={'/product/'+product.id}
         className="rounded bg-white border border-gray-200 block relative p-1 hover:border-blue-300">
          <LazyLoadImage
           alt={product.product_name}
           placeholderSrc="https://t4.ftcdn.net/jpg/02/61/49/05/360_F_261490536_nJ5LSRAVZA0CK9Nvt2E1fXJVUfpiqvhT.jpg"
           effect="blur"
          height="16rem"
      src={API.imagePath + product.images[0]} // use normal <img> attributes as props
      width="100%"
      className="mx-auto mix-blend-multiply w-auto max-h-64"
       />
      </Link>
      <div className="pt-3">
          <button onClick={() => {cartCtx.add(product);}} className="float-right px-3 py-2 text-gray-400 border border-gray-300 rounded-md hover:border-teal-400 hover:text-teal-600">
              <i className="fa fa-shopping-cart"></i>
          </button>

          { Number(product.total_price) < Number(product.product_price) ? (
          <p className="font-semibold">{product.total_price}$
            <del className="text-sm text-gray-500 line-through">{product.product_price}$</del>
          </p>) : ( <p className="font-semibold">{product.product_price}$</p>) }
            
      
          <h6>
              <a href="" className="text-gray-600 hover:text-blue-500">
                  {product.product_name}
              </a>
          </h6>
          <small className="text-sm text-gray-400"> {product.product_description.substring(0,120)+'...'}</small>
      </div>
  </article>
  );
}


export default ProductCard;