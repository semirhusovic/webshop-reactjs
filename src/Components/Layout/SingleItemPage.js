import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { API } from '../../apiRoutes';
import useFetch from '../../customHooks/useFetch';
import SingleItemGallery from './SingleItemGallery';
import CartContext from '../../Contexts/CartContext';


function SingleItemPage(){
  const cartCtx = useContext(CartContext);
  const { id } = useParams();
  const { data: product, loading: isLoading } = useFetch(
    API.url + API.products+id
  );
  return (
    <>
    {isLoading && <h1>Loading</h1>}
    {product !== null &&
    <section className="bg-white py-10">
		<div className="container max-w-screen-xl mx-auto px-4">
			
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
				<aside>
          <SingleItemGallery images={product.images}></SingleItemGallery>
				</aside>
				<main>
					<h2 className="font-semibold text-2xl mb-4">
						{product.productName}
					</h2>

					<div className="flex flex-wrap items-center space-x-2 mb-2">
{/* 
						<img className="d-inline-block h-4" src="images/misc/stars-active.svg" alt="Rating" />
						<span className="text-yellow-500">9.3</span>

						<svg width="6px" height="6px" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
							<circle cx="3" cy="3" r="3" fill="#DBDBDB"></circle>
						</svg>

						<span className="text-gray-400">
							<i className="fa fa-shopping-bag mr-2"></i> 154 orders
						</span>

						<svg width="6px" height="6px" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
							<circle cx="3" cy="3" r="3" fill="#DBDBDB"></circle>
						</svg>

						<span className="text-green-500">Verified</span> */}

					</div>

					<p className="mb-4 font-semibold text-xl">${product.total_price} 
						{/* <span className="text-base font-normal">/1 item</span> */}
					</p>

					<p className="mb-4 text-gray-500">
						{product.productDescription}
					</p>

					
					<ul className="mb-5">
						<li className="mb-1"> <b className="font-medium w-36 inline-block">Warranty</b> 
							<span className="text-gray-500">{product.productMonthsOfWarranty}</span>
						</li>
						<li className="mb-1"> <b className="font-medium w-36 inline-block">Color:</b> 
							<span className="text-gray-500">Brown</span>
						</li>
						<li className="mb-1"> <b className="font-medium w-36 inline-block">Delivery:</b> 
							<span className="text-gray-500">Russia, USA &amp; Europe</span></li>
						<li className="mb-1"> <b className="font-medium w-36 inline-block">Color:</b> 
							<span className="text-gray-500">Brown</span>
						</li>
					</ul>

					<div className="flex flex-wrap mb-4">
						
						<div className="relative w-1/3 lg:w-1/4 mr-2 mb-4">
					      <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 pr-5 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
					        <option>Select size</option>
					        <option>Extra large</option>
					        <option>Medium size</option>
					        <option>Normal size</option>
					      </select>
					      <i className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
					        <svg width="24" height="24" className="fill-current h-5 w-5" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"></path></svg>
					      </i>
					    </div>
					   

				
						<div className="relative w-1/3 lg:w-1/4 mr-2 mb-4">
					      <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 pr-5 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
					        <option>Select color</option>
					        <option>Lightblue</option>
					        <option>Green</option>
					        <option>Black</option>
					      </select>
					      <i className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
					        <svg width="24" height="24" className="fill-current h-5 w-5" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"></path></svg>
					      </i>
					    </div>
					 
					</div>
				
					<div className="flex flex-wrap gap-2">
						<button onClick={() => {cartCtx.add(product);}} className="px-4 py-2 inline-block text-white bg-teal-400 border border-transparent rounded-md hover:bg-teal-600">
							<i className="fa fa-shopping-cart mr-2"></i> 
							Add to cart 
						</button>
					</div>
		
				</main>
			</div>
		</div>
	</section>}
    </>
  )
}

export default SingleItemPage