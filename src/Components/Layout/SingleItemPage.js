import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { API } from '../../apiRoutes';
import useFetch from '../../customHooks/useFetch';
import SingleItemGallery from './SingleItemGallery';
import CartContext from '../../Contexts/CartContext';
import { CirclePicker } from 'react-color';
import {useUpdateEffect} from 'react-use';


function SingleItemPage(){
  const cartCtx = useContext(CartContext);
  const { id } = useParams();
	const [size,setSize] = useState(3);
	const [quantityLeft,setQuantityLeft] = useState(0);
	const [color,setColor] = useState();
	const [colorApi,setColorApi] = useState([]);
	const [colorData,setColorData] = useState();
	const [stockId,setStockId] = useState();
 
	let xa = [];
	useUpdateEffect(()=>{
		console.log(color)
	},[color]);

	useUpdateEffect(() => {
		console.log('stock id je:',stockId);
	}, [stockId])
	

  const { data: product, loading: isLoading } = useFetch(
    API.url + API.products+id
  );

	const { data: sizes, loading: isLoadingSizes } = useFetch(
    API.url + API.stock + id + '/'
  );


	const handleChangeComplete = (color) => {
		setColor(color)
		setQuantityLeft(colorData[colorApi.indexOf(color)].quantity)
		setStockId(colorData[colorApi.indexOf(color)].stock_id)
	}


useUpdateEffect(() => {
	setColor(); //reset selektovane boje kad se promijeni velicina
	setQuantityLeft(0); //reset selektovane boje kad se promijeni velicina
	fetch(API.url + API.stock+id+'/'+size, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('token')
		}
	})
		.then((res) => res.json())
		.then((data) => {
			setColorData(data)
			if (data.error) {
				console.log('greska')
			} else {
				xa = data.map((item)=>item.hexcode);
					setColorApi(xa);
			}
		})
		.catch((error) => console.log(error));
},[size]) 

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
						{product.product_name}
					</h2>

					<div className="flex flex-wrap items-center space-x-2 mb-2">

					</div>

					<p className="mb-4 font-semibold text-xl">${product.total_price} 
						<span className="text-base font-normal">/1 {product.unit_of_measure}</span>
					</p>

					<p className="mb-4 text-gray-500">
						{product.product_description}
					</p>

					
					<ul className="mb-5">
						<li className="mb-1"> <b className="font-medium w-36 inline-block">Warranty</b> 
							<span className="text-gray-500">{product.product_months_of_warranty} months</span>
						</li>
						<li className="mb-1"> <b className="font-medium w-36 inline-block">Manufacturer:</b> 
							<span className="text-gray-500">{product.manufacturer}</span>
						</li>
						<li className="mb-1"> <b className="font-medium w-36 inline-block">Origin country:</b> 
							<span className="text-gray-500">{product.country_name}</span>
						</li>
						{!isLoadingSizes && quantityLeft > 0 &&  <li className="mb-1"> <b className="font-medium w-36 inline-block">Quantity left:</b> 
						<span className="text-base text-red-400 font-normal">{quantityLeft}</span>
						</li>}
						{/* <li className="mb-1"> <b className="font-medium w-36 inline-block">Color:</b> 
							<span className="text-gray-500">Brown</span>
						</li> */}
					</ul>

					<div className="flex flex-wrap mb-4">
						
						<div className="relative w-1/3 lg:w-1/4 mr-2 mb-4">
					      <select onChange={(event) => setSize(event.target.value)} className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 pr-5 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
					      <option value={0}>{!isLoadingSizes && sizes.length == 0 ? 'Out of stock' : 'Select'}</option>
								 {!isLoadingSizes && sizes.length > 0 && sizes.map((size,index)=>
										<option value={size.size_id} key={index}>{size.size_name}</option>
								 )}
					      </select>
					      <i className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
					        <svg width="24" height="24" className="fill-current h-5 w-5" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"></path></svg>
					      </i>
					    </div>
					   

				
						{/* <div className="relative w-1/3 lg:w-1/4 mr-2 mb-4">
					      <select className="block appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 pr-5 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full">
					        <option>Select color</option>
					        <option>Lightblue</option>
					        <option>Green</option>
					        <option>Black</option>
					      </select>
					      <i className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
					        <svg width="24" height="24" className="fill-current h-5 w-5" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"></path></svg>
					      </i>
					    </div>	  */}
					</div>
				
					<div className='mb-5'>
							<CirclePicker
							// onChange={handleChange}
							color={color}
							onChangeComplete={(e)=>{console.log(e)
								 handleChangeComplete(e.hex)}}
							colors={colorApi}
							/>
							</div>

					<div className="flex flex-wrap gap-2">
						<button onClick={() => {cartCtx.add(product,stockId);}} className="px-4 py-2 inline-block text-white bg-teal-400 border border-transparent rounded-md hover:bg-teal-600">
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