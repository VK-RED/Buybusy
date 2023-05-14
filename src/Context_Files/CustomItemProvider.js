import { createContext, useState,useContext,useEffect } from "react";
import { useDetails } from "./CustomUserProvider";
import { onSnapshot,doc,setDoc,getDoc } from "firebase/firestore";
import {db} from "../firebase";
import { useNavigate } from "react-router-dom";



//CREATING THE CONTEXT
const itemsContext = createContext();

//COSUMING THE CONTEXT
function useItems(){
    const value = useContext(itemsContext);
    return value;
}


//PROVIDING THE CUSTOM CONTEXT
function CustomItemProvider({children}){

    // const navigate = useNavigate();
    const [cart,setCart] = useState([]);
    const [orders,setOrders] = useState([]);
    const [price,setPrice] = useState(0);

    const {loggedIn,userId} = useDetails();
    

    useEffect(()=>{

        if(loggedIn){

            onSnapshot(doc(db,"cartData",userId),(doc)=>{
                setCart(doc.data().cart);    
            })

            onSnapshot(doc(db,"orderData",userId),(doc)=>{
                setOrders(doc.data().order);
            })           
        }
        else{
            setCart([]);
            setOrders([]);        
        }

    },[loggedIn])

    //ONCE THE USER IS LOGGED IN, SETPRICE IS DONE
    useEffect(()=>{

        if(loggedIn){

            const cartRef = doc(db,"cartData",userId);
        
            getDoc(cartRef)
                .then((doc)=>(doc.data().cart))
                .then((arr)=>{
                    const total = arr.reduce((acc,cur)=>{
                        acc += (cur.price * cur.quantity);
                        return acc;
                    },0);
                    setPrice(roundToTwoDecimalPlaces(total));
                })

        }

    },[loggedIn])


    //FUNCTION TO ROUND OF THE NUMBERS 
    function roundToTwoDecimalPlaces(number) {
        return Number(number.toFixed(2));
    }

    
    //ADDING THE PRODUCTS TO CART D.B AND INCREASING THE PRICE
    //AND HANDLING THE QUANTITY

    async function addToCart(prod){

        const total = price+prod.price;
        setPrice(roundToTwoDecimalPlaces(total));

        let arr = cart;

        const ind = arr.findIndex((product)=>(product.id==prod.id));

        //IF THE ITEM IS FOUND INCREASING THE QUANTITY ELSE SETTING THE QUANTITY
        if(ind >= 0){
            arr[ind].quantity++;
        }
        else{
            arr.push({
                quantity : 1,
                ...prod,
            })
        }

        await setDoc(doc(db,"cartData",userId),{
            cart:arr,
        })
  
    }

    //REMOVING THE ITEM FROM CART
    async function removeFromCart(product){

        const total = ( price - (product.price * product.quantity));
        setPrice(roundToTwoDecimalPlaces(total));

        let arr = cart;
        const ind = arr.findIndex((prod) => (product.id == prod.id));
        arr.splice(ind,1);

        await setDoc(doc(db,"cartData",userId),{
            cart:arr,
        })
        
    }

    //DECREASING THE QUANTITY
    async function decQuantity(prod){

        const total = price - prod.price;
        setPrice(roundToTwoDecimalPlaces(total));
        
        let arr = cart;

        const ind = arr.findIndex((product) => (product.id == prod.id));

        arr[ind].quantity--;

        if(arr[ind].quantity == 0)
            arr.splice(ind,1);
            
        await setDoc(doc(db,"cartData",userId),{
            cart:arr,
        })
    }

    
    function getCurrentDateTime() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        
        const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return dateTimeString;
      }
      
      
      
      
      
      

    //HANDLE PURCHASE
    async function handlePurchase(){

        setPrice(0);

        await setDoc(doc(db,"orderData",userId),{

           order:[{
                orderedOn : getCurrentDateTime(),
                overallPrice : price,
                purchaseCart : cart,
           }, ...orders]  
            
        })

        await setDoc(doc(db,"cartData",userId),{
            cart:[],
        })

        

        
    }



    return(
        <itemsContext.Provider value={{ cart,
                                        orders,
                                        price,
                                        addToCart,
                                        decQuantity,
                                        removeFromCart,
                                        handlePurchase,
                                        }}>
            {children}
        </itemsContext.Provider>
    )
}

export{useItems};
export default CustomItemProvider;