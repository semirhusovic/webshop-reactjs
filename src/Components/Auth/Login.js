import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API } from '../../apiRoutes';
import AuthContext from '../../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const validationSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(5,'Password should be at least 5 characters')
});

function Login() {
  const [hasError, sethasError] = useState();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      fetch(API.url  + API.login, {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
            // sethasError(data.error);
          } else {
            authCtx.login(data.access_token);
            toast.success('You have successfuly logged in!')
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


    <div className="max-w-sm mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg">


        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit()}}>
            <h2 className="mb-5 text-2xl font-semibold">Sign in</h2>

            <div className="mb-4">
                <label className="block mb-1"> Email </label>
                <input className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                       type="text" 
                       name="email"                   
                       required
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       placeholder="Type here" />
            </div>
            <span className='text-red-500'>{formik.touched.email && formik.errors.email}</span>

            <div className="mb-4">
                <label className="block mb-1"> Password </label>
                <input className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full" 
                       name="password" 
                       type="password"
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       placeholder="Type here" />
            </div>
            <span className='text-red-500 mx-auto'>{formik.touched.password && formik.errors.password}</span>

            <label className="flex items-center w-max mb-5">
                <input  name="" type="checkbox" className="h-4 w-4 checked:bg-teal-400 focus:border-teal-300" />
                <span className="ml-2 inline-block text-gray-500"> Remember me </span>
            </label>


            {hasError && (
              <span style={{ color: 'red', display: 'flex', justifyContent: 'center' }}>
                {hasError}
              </span>
            )}


            <button type="submit" className="px-4 py-2 text-center w-full inline-block text-white bg-teal-400 border border-transparent rounded-md hover:bg-teal-600">  Sign in </button>

                Don’t have an account?  <Link className="text-blue-500" to={'/register'}>Sign up</Link>
        </form>
    </div>
    <ToastContainer />
</div>
  );
}

export default Login;