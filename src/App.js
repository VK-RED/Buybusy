import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch} from "react-redux";
import { onAuthStateChanged} from "firebase/auth";
import {auth,db} from "./firebase";
import { onSnapshot, doc} from "firebase/firestore";
import { userActions} from "./redux/reducers/userReducer";
import { cartActions } from "./redux/reducers/cartReducer";
import { orderActions } from "./redux/reducers/orderReducer";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import Order from "./Pages/Order";
import Cart from "./Pages/Cart";
import { useEffect } from "react";

function App() {

  const dispatch = useDispatch();

  //ONCE THE APP GETS MOUNTED, ESTABLISHING THE PERSISTENT CONNECTION
  //AND GETTING THE USER,CART&ORDER INFOS AND DISPATCHING THE DATA TO STORE
  
  useEffect(()=>{

    onAuthStateChanged(auth,(user)=>{
      if(user){
          dispatch(userActions.setUser(user.uid));

          onSnapshot(doc(db, "cartData", user.uid),(snapShot)=>{
              dispatch(cartActions.setCart(snapShot.data().cart));
              const cart = snapShot.data().cart;
              const total = cart.reduce((acc,cur)=>{
                  acc += (cur.price * cur.quantity);
                  return acc;
              },0);
              const totalPrice = roundToTwoDecimalPlaces(total);
              dispatch(cartActions.setPrice(totalPrice));
          })

          onSnapshot(doc(db, "orderData", user.uid),(snapShot)=>{
              dispatch(orderActions.setOrders(snapShot.data().orders));
          })
      }    
      else{
          dispatch(userActions.setUser(""));
          dispatch(cartActions.setCart([]));
          dispatch(orderActions.setOrders([]));
      }
          
    })


  },[]);

  //FUNCTION TO ROUND OF THE NUMBERS 
  function roundToTwoDecimalPlaces(number) {
    return Number(number.toFixed(2));
  }

  const router = createBrowserRouter([
    
    {
      path : "/" , element : <Navbar/>, children:[

        {
          index: true, element : <Home />
        },

        {
          path:"signin" , element : <Signin/>
        },

        {
          path:"signup" , element : <Signup/>
        },

        {
          path:"cart", element : <Cart />
        },

        {
          path : "order", element: <Order/>
        }

      ]
    }

  ]);

  return (     
      <RouterProvider router={router} />    
  );
}

export default App;
