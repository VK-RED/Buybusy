import { createBrowserRouter,RouterProvider } from "react-router-dom";
import CustomUserProvider from "./Context_Files/CustomUserProvider";
import CustomItemProvider from "./Context_Files/CustomItemProvider";
import Home from './Pages/Home';
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Navbar from "./Components/Navbar"
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import ErrorPage from "./Pages/ErrorPage"

function App() {


  const Router = createBrowserRouter([

    {path:"/" , element : <Navbar /> , errorElement : <ErrorPage />,
    
    children : [

      {
        index: true, element : <Home />
      },

      {
        path : "signin" , element : <Signin />
      },

      {
        path : "signup" , element : <Signup />
      },

      {
        path: "cart" , element : <Cart />
      },

      {
        path: "orders", element : <Orders />
      }


    ] }

  ]);


  return (
  
      // CUSTOM PROVIDER FOR USER LOGGIN STATUS AND ID
      <CustomUserProvider>

        {/* CUSTOM PROVIDER FOR ACCESSING CART,PRICE,ORDER HISTORY */}
        <CustomItemProvider>

          {/* ROUTING NEEDS TO BE GIVEN BETWEEN THE CONTEXT API */}
          <RouterProvider router = {Router} />

        </CustomItemProvider>
        
      </CustomUserProvider>
      

  );
}

export default App;
