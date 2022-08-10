import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API } from '../../apiRoutes';
import AuthContext from '../../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const validationSchema = yup.object({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required').min(5,'Password should be at least 5 characters.'),
  password_confirmation: yup.string().required().oneOf([yup.ref("password"), null], "Passwords must match")
});

function Register() {
  const [hasError, sethasError] = useState();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    onSubmit: (values) => {
      fetch(API.url  + API.register, {
        method: 'POST',
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation
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
  return (
    <div className="container max-w-screen-xl mx-auto px-4">


    
        <div style={{maxWidth: '480px'}} className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">
          
            <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit()}}>
                
                <h2 className="mb-5 text-2xl font-semibold">Sign up</h2>

                {/* <div className="grid md:grid-cols-2 gap-x-2"> */}
                    <div className="mb-4">
                        <label className="block mb-1"> First name </label>
                        <input 
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text" 
                        name="first_name" 
                        value={formik.values.first_name}
                       onChange={formik.handleChange}
                       placeholder="Type here" />
                    </div>
                    <span className='text-red-500'>{formik.touched.first_name && formik.errors.first_name}</span>

                    <div className="mb-4">
                        <label className="block mb-1"> Last name </label>
                        <input className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" 
                               type="text" 
                               name="last_name" 
                               value={formik.values.last_name}
                               onChange={formik.handleChange}
                               placeholder="Type here" />
                    </div>
                    <span className='text-red-500'>{formik.touched.last_name && formik.errors.last_name}</span>
                {/* </div> */}

                <div className="mb-4">
                    <label className="block mb-1"> Phone </label>
                        <input className="appearance-none flex-1 border border-gray-200 bg-gray-100 rounded-tr-md rounded-br-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" 
                               type="text" 
                               name="phone" 
                               value={formik.values.phone}
                               onChange={formik.handleChange}
                               placeholder="Type here" />
                </div>
                <span className='text-red-500'>{formik.touched.phone && formik.errors.phone}</span>

                <div className="mb-4">
                    <label className="block mb-1"> Email </label>
                    <input className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" 
                           type="email" 
                           name="email" 
                           value={formik.values.email}
                           onChange={formik.handleChange}
                           placeholder="Type here" />
                </div>
                <span className='text-red-500'>{formik.touched.email && formik.errors.email}</span>

                <div className="mb-4">
                    <label className="block mb-1"> Create password </label>
                    <input className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" 
                           type="password" 
                           name="password" 
                           value={formik.values.password}
                           onChange={formik.handleChange}
                           placeholder="Type here" />
                </div>
                <span className='text-red-500'>{formik.touched.password && formik.errors.password}</span>

                <div className="mb-4">
                    <label className="block mb-1"> Confirm password </label>
                    <input className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" 
                           type="password" 
                           name="password_confirmation"  
                           value={formik.values.password_confirmation}
                           onChange={formik.handleChange}
                           placeholder="Type here" />
                </div>
                <span className='text-red-500'>{formik.touched.password_confirmation && formik.errors.password_confirmation}</span>

                <button type="submit" className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-teal-400 border border-transparent rounded-md hover:bg-teal-600"> Register </button>
            </form>
        </div>
        <ToastContainer />
    </div>
  );
}

export default Register;