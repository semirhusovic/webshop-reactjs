import { Link } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import React, { useContext } from 'react';
import CartContext from '../../Contexts/CartContext';


function Header({ children }) {
  const authCtx = useContext(AuthContext);
  const [cartItems] = useContext(CartContext)['cartState'];
  return (
    <div className="App">
      <div className="font-sans antialiased">
        <div className="min-h-screen bg-gray-100">

        <header className="bg-white py-3 border-b">
    <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">

            <div className="flex-shrink-0 mr-5">
                <Link to="/"> <img src="https://www.mojposao.me/administracija/logo/amplitudo%20logo.png" height="90px" width="auto" alt="Brand" className='max-h-11' /> </Link>
            </div>

        
            <div className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4">
                <input className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400" type="text" placeholder="Search" />
                <button type="button" className="px-4 py-2 inline-block text-white border border-transparent bg-teal-400 rounded-md hover:bg-teal-600">
                    <i className="fa fa-search"></i>
                </button>
            </div>

          
            <div className="flex items-center space-x-2 ml-auto">
             
                

            {authCtx.isLoggedIn ? (
              <button onClick={authCtx.logout} className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300">
              <i className="text-gray-400 w-5 fa fa-user"></i>
              <span className="hidden lg:inline ml-1">Logout</span>
          </button>
          ) : (
            <Link to={"/login"} className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300">
            <i className="text-gray-400 w-5 fa fa-user"></i>
            <span className="hidden lg:inline ml-1">Sign in</span>
        </Link>
          )}
                   

                <Link className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300" to={'/cart'}>
                    <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
                    <span className="hidden lg:inline ml-1">My cart
                    {cartItems.length > 0 && (
                      <span className="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">{cartItems.length}</span>
                    )}
                    </span>
                </Link>
            </div>
        

        
            <div className="lg:hidden ml-2">
                <button type="button" className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent">
                    <span className="sr-only">Open menu</span>
                    <i className="fa fa-bars fa-lg"></i>
                </button>
            </div>
          

        </div>
    </div> 
</header>
<nav className="relative shadow-sm">
    <div className="container max-w-screen-xl mx-auto px-4">
        <div className="hidden lg:flex flex-1 items-center py-1">
            <Link className="px-3 py-2 rounded-md hover:bg-gray-100" to="#"> Heading1 </Link>
            <Link className="px-3 py-2 rounded-md hover:bg-gray-100" to="#"> Heading2 </Link>
            <Link className="px-3 py-2 rounded-md hover:bg-gray-100" to="#"> Heading3 </Link>
            <Link className="px-3 py-2 rounded-md hover:bg-gray-100" to="#"> Heading4 </Link>
            <Link className="px-3 py-2 rounded-md hover:bg-gray-100" to="#"> Heading5 </Link>
        </div>
    </div> 
</nav>


            <main>
            {children}
            </main>
        </div>
        <section className="bg-teal-600 py-6 text-white">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="lg:flex justify-between">
                    <div className="mb-3">
                        <img src={'/img/payments.png'} height="24" className="h-6" alt="Payment methods"/>
                    </div>
                    <div className="space-x-6">
                        <nav className="text-sm space-x-4">
                            <Link to="#" className="opacity-70 hover:opacity-100">
                                © All rights reserved {(new Date().getFullYear())}
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </div>
  );
}

export default Header;