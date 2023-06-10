import { cartSelector, addToCartThunk } from "../redux/reducers/cartReducer";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



function ProductItem({product}){

    const userId = useSelector(userSelector);
    const dispatch = useDispatch();
    const cart = useSelector(cartSelector);
    const navigate=useNavigate();

    async function addToCart(){

        if(userId)
            dispatch(addToCartThunk({product,cart,userId}));
        else
            navigate("/signin");
    }


    return(
        <div className="flex-col items-center flex-wrap bg-white w-52 md:w-64 rounded-xl overflow-hidden p-2 shadow-xl transition ease-out duration-300 transform hover:scale-105 hover:shadow-2xl">
            
            <img src = {product.image} 
                className="h-60 w-48 bg-gray-200 mx-auto"
            /> 
            
            

            <div className="text-center"> 

                <p className="text-xl m-4">
                    {product.title.substring(0,65)+"..."}
                </p>
                

                <h4 className="text-lg font-bold text-gray-700 m-2">{"₹"+product.price}</h4>


                <button className="cursor-pointer font-bold px-3 py-2 rounded-full border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition ease-out duration-300 mb-4" onClick={addToCart}> Add to Cart </button>
            </div>

            

        </div>
    )
}

export default ProductItem;