import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
    orders:[],
}

//ADDING THE CURRENT ORDER TO THE ORDERS IN D.B
const addToOrderThunk = createAsyncThunk("addToOrderThunk",async({orders,cart,price,userId})=>{

    await setDoc(doc(db, "orderData", userId),{
        orders:[
            {
                orderedOn:new Date().toISOString().substring(0,10),
                netPrice:price,
                cart,
            },
            ...orders
        ]
    });

})

const orderSlice = createSlice({
    name:"orderSlice",
    initialState,
    reducers:{
        setOrders:(state,action)=>{
            state.orders = [...action.payload];
        }
    }
});

const orderReducer = orderSlice.reducer;
const orderActions = orderSlice.actions;
const orderSelector = (state) => state.orderReducer.orders;

export {orderActions, orderReducer, orderSelector, addToOrderThunk};