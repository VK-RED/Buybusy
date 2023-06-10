import {createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
    cart : [],
    price : 0,
}

//FUNCTION TO ROUND OF THE NUMBERS 
function roundToTwoDecimalPlaces(number) {
    return Number(number.toFixed(2));
}


//ADDING THE ITEM TO THE CART IN D.B
const addToCartThunk = createAsyncThunk("addToCartThunk", async ({product,cart,userId},thunkAPI)=>{
    let arr = cart.map((prod)=>({...prod}));
    const ind = arr.findIndex((prod)=>prod.id == product.id);

    
    if(ind > -1)
        arr[ind].quantity++;
    else
        arr.push({...product,quantity:1});

    const updatedPrice = arr.reduce((acc,cur)=>{
            acc += (cur.price  * cur.quantity);
            return acc;
    },0);

    const totalPrice = roundToTwoDecimalPlaces(updatedPrice);
    

    await setDoc(doc(db,"cartData",userId),{
        cart:arr,
    });

    thunkAPI.dispatch(cartActions.setPrice(totalPrice));

})

//REMOVING THE ITEM FROM CART IN D.B
const removeCartThunk = createAsyncThunk("removeCartThunk", async({product,cart,userId}, thunkAPI)=>{
    let arr = cart.map((prod)=>({...prod}));
    const ind = arr.findIndex((prod)=>prod.id == product.id);

    arr.splice(ind,1);

    const updatedPrice = arr.reduce((acc,cur)=>{
        acc += (cur.price  * cur.quantity);
        return acc;
    },0);

    const totalPrice = roundToTwoDecimalPlaces(updatedPrice);


    await setDoc(doc(db,"cartData",userId),{
        cart:arr,
    });

    thunkAPI.dispatch(cartActions.setPrice(totalPrice));


})

//DECRESING THE ITEM FROM CART IN D.B
const decCartThunk = createAsyncThunk("decCartThunk", async ({product,cart,userId}, thunkAPI)=>{
    let arr = cart.map((prod)=>({...prod}));
    const ind = arr.findIndex((prod)=>prod.id==product.id);

    arr[ind].quantity--;

    if(arr[ind].quantity == 0)
        arr.splice(ind,1);

    const updatedPrice = arr.reduce((acc,cur)=>{
        acc += (cur.price  * cur.quantity);
        return acc;
    },0);

    const totalPrice = roundToTwoDecimalPlaces(updatedPrice);

    await setDoc(doc(db,"cartData",userId),{
        cart:arr,
    });

    thunkAPI.dispatch(cartActions.setPrice(totalPrice));

})


const cartSlice = createSlice({
    name : "cartSlice",
    initialState,
    reducers:{
        setCart:(state,action)=>{
            state.cart = [...action.payload];
        },
        setPrice:(state,action)=>{
            state.price = action.payload;
        }
    },
    
    
});

const cartReducer = cartSlice.reducer;
const cartActions = cartSlice.actions;
const cartSelector = (state) => state.cartReducer.cart;
const priceSelector = (state) => state.cartReducer.price;

export {
        cartActions, 
        cartReducer, cartSelector,addToCartThunk,
        decCartThunk,removeCartThunk,priceSelector
    }