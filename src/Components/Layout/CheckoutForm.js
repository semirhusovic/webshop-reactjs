import {useContext,useEffect} from 'react';
import useScript from "../../customHooks/useScript";
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  f_name: yup.string().required('First Name is required'),
  l_name: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone_number: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  card_holder: yup.string().required('Card Holder is required'),
  exp_month: yup.string().required('Expiry month is required'),
  exp_year: yup.string().required('Expiry year is required'),
});

function CheckoutForm() {
  useScript('https://asxgw.paymentsandbox.cloud/js/integrated/payment.1.3.min.js');
	useScript('https://code.jquery.com/jquery-3.6.0.min.js');


  const formik = useFormik({
    initialValues: {
      f_name: '',
      l_name: '',
      phone: '',
      email: '',
      phone_number: '',
      city: '',
      address: '',
      card_holder: '',
      exp_year: '',
      exp_month: '',
      transaction_token: ''
    },
    onSubmit: (values) => {
      fetch(API.url  + API.register, {
        method: 'POST',
        body: JSON.stringify({
          f_name: values.first_name,
          l_name: values.last_name,
          phone_number: values.phone_number,
          email: values.email,
          transaction_token: values.transaction_token,
          city: values.city,
          address:values.address,
          card_holder: values.card_holder,
          exp_year: values.exp_year,
          exp_month: values.exp_month
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
            sethasError(data.error);
          } else {
            authCtx.login(data.access_token);
            toast.success('You have successfuly registered!')
            navigate('/');
          }
        })
        .catch((error) => {sethasError(error)
          toast.error('There has been an error! '+error)
        });
    },
    validationSchema: validationSchema
  });


	// eslint-disable-next-line
	var payment = new PaymentJs();
	payment.init('LhBhASbfn8hHLnZDl5w9', 'number_div', 'cvv_div', function(payment) {
    payment.setNumberStyle({ 
        'border': '1px solid #e5e7eb',
        'height': '2.5rem',
        'background-color':'#f3f4f6', 
        'width': '98%' 
    });
    payment.setCvvStyle({ 
        'border': '1px solid #e5e7eb', 
        'height': '2.5rem',
        'background-color':'#f3f4f6', 
        'width': '98%' 
    });
    payment.numberOn('input', function(data) {
			// console.log(data);
        // console.log('A number was entered');
    })
		payment.cvvOn('input', function(data) {
			// console.log(data);
        console.log('A number was entered');
    })
});

function interceptSubmit() {
	/* eslint-env jquery */
	var data = {
			card_holder: $('#card_holder').val(),
			month: $('#exp_month').val(),
			year: $('#exp_year').val(),
			email: $('#email').val()
	};
	payment.tokenize(
			data, //additional data, MUST include card_holder (or first_name & last_name), month and year
			function(token, cardData) { //success callback function
					$('#transaction_token').val(token); //store the transaction token
					console.log(token)
					console.log(cardData)
					// $('#payment_form').get(0).submit(); //submit the form
			}, 
			function(errors) { //error callback function
					alert('Errors occurred',errors);
					console.log(errors);
				
			}
	);
}

async function handleSubmit (e) {
	e.stopPropagation();
	e.preventDefault();
	await interceptSubmit();
}

  return (
    <>
    <h2 className="text-xl font-semibold mb-5">Checkout</h2>
			<form id="payment_form" onSubmit={(e) => {handleSubmit(e)}}>	
			<input type="hidden" name="transaction_token" id="transaction_token" />
			<div className="grid grid-cols-2 gap-x-3">
				<div className="mb-4">
			      <label className="block mb-1"> First name </label>
			      <input name="f_name" className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" type="text" placeholder="Type here" />
			    </div>
				
				<div className="mb-4">
			      <label className="block mb-1"> Last name </label>
			      <input name="l_name" className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" type="text" placeholder="Type here" />
			    </div>
			</div>

			<div className="grid lg:grid-cols-2 gap-x-3">
				<div className="mb-4">
			      <label className="block mb-1"> Phone </label>
			      <div className="flex  w-full">
			      	<input className="appearance-none w-24 border border-gray-200 bg-gray-100 rounded-tl-md rounded-bl-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400" type="text" placeholder="Code" value="+382" readOnly/>
			      	<input name='phone_number' className="appearance-none flex-1 border border-gray-200 bg-gray-100 rounded-tr-md rounded-br-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400" type="text" placeholder="Type phone" />
			      </div>
			    </div>

				<div className="mb-4">
			      <label className="block mb-1"> Email </label>
			      <input name="email" className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" type="email" placeholder="Type here" />
			    </div>
			</div>

			<div className="grid md:grid-cols-3 gap-x-3">
				<div className="mb-4 md:col-span-2">
			      <label className="block mb-1"> Address* </label>
			      <input name="address" className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" type="text" placeholder="Type here" />
			    </div>
				
				<div className="mb-4 md:col-span-1">
			      <label className="block mb-1"> City* </label>
			      <input name='city' className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" type="text" placeholder="Type here" />
			    </div>
			</div>

			<hr className="my-4"/>

			<div className="my-4">
			<label className="block mb-1"> Card Number* </label>
			<div id="number_div" style={{height: '2.5rem'}} className="w-full rounded-md"></div>
            </div>

            <div className="my-4">
						<label className="block mb-1"> Cartholder name* </label>
              <input
                type="text"
								id="card_holder"
                name="card_holder"
                className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                placeholder="Cardholder Name"
                required
              />
            </div>
   

              <div className="grid md:grid-cols-4 gap-x-3">
								  <div className="mb-4 md:col-span-1">
									<label className="block mb-1"> Expiration month* </label>
                    <input
                      type="tel"
                      name="exp_month"
											id="exp_month"
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      placeholder="Expiration month"
                      required
                    />
                </div>
								  <div className="mb-4 md:col-span-1">
									<label className="block mb-1"> Expiration year* </label>
                    <input
                      type="tel"
                      name="exp_year"
											id="exp_year"
                      className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                      placeholder="Expiration year"
                      required
                    />
                </div>
									<div className="mb-4 md:col-span-1">
										<label className="block mb-1"> Cvv number* </label>
												<div id="cvv_div" style={{height: '2.5rem'}} className="w-full rounded-md"></div>
									</div>
							</div>
							<button className="w-full text-bold px-5 py-2 inline-block text-white bg-teal-400 border border-transparent rounded-md hover:bg-teal-600">PAY</button>

							</form>
    </>
  )
}

export default CheckoutForm