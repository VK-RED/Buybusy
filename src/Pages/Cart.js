import { useSelector,useDispatch } from "react-redux";
import { cartSelector,addToCartThunk,decCartThunk,removeCartThunk,priceSelector,cartActions} from "../redux/reducers/cartReducer";
import { userSelector } from "../redux/reducers/userReducer";
import { addToOrderThunk, orderSelector } from "../redux/reducers/orderReducer";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";


function Cart(){

    const cart = useSelector(cartSelector);
    const userId = useSelector(userSelector);
    const price = useSelector(priceSelector);
    const orders = useSelector(orderSelector)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    //THE ASYNC OPERATIONS ARE HANDLED BY THEIR RESPECTIVE THUNKS

    function addToCart(product){
        dispatch(addToCartThunk({product,cart,userId}));
    }

    function removeFromCart(product){
        dispatch(removeCartThunk({product,cart,userId}));
    }

    function decQuantity(product){
        dispatch(decCartThunk({product,cart,userId}))
    }

    async function handlePurchase(){
        dispatch(addToOrderThunk({orders,cart,price,userId}));
        await setDoc(doc(db, "cartData", userId),{
            cart:[],
        });
        dispatch(cartActions.setPrice(0));
        navigate("/order");
    }

    return(
        <div className="p-3">
            
            <div className="border-8 mb-10 h-32 w-96 mx-auto rounded-lg text-center p-2">
                
                <h3 className="text-2xl font-semibold mb-4">TotalPrice - Rs.{price}</h3>
                {
                    cart.length>0 && <button className="cursor-pointer font-bold px-3 py-2 rounded-full border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition ease-out duration-300 mb-4"
                        onClick = {handlePurchase}> 
                            Purchase Now 
                    </button>
                }
                
            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10 px-3 py-3">
                {
                    cart.map((product)=>

                        <div className=" w-52 md:w-72 p-2 flex-col flex-wrap items-center text-center rounded-xl overflow-hidden bg-white "
                            key = {product.id} >

                            <img src = {product.image} className="h-60 w-48 mx-auto"/>

                            <p className="text-xl m-2">
                                {product.title.substring(0,50)+"..."}
                            </p>
                            

                            <div className="flex-col h-12 items-center justify-evenly mb-8 mt-2">

                                <div className="text-lg text-center">

                                    <svg onClick={()=>decQuantity(product)} className="mx-2 w-6 h-6 cursor-pointer inline-block" fill="none" stroke="currentColor"      stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>

                                    
                                    <span className="font-semibold">{product.quantity}</span>

                                    <svg onClick={()=>addToCart(product)}  className=" mx-2 w-6 h-6 cursor-pointer inline-block" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>

                                    
                                </div>

                                <div className="text-2xl font-bold text-gray-800">
                                    {"₹"+product.price}
                                </div>

                            </div>

                            <button className="cursor-pointer font-bold px-3 py-2 rounded-full text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition ease-out duration-300 mb-3"

                             onClick={()=>removeFromCart(product)}> 
                                Remove From Cart 
                            </button>
                        </div>
                    )
                }
            </div>
            
        </div>
    )
}

export default Cart;