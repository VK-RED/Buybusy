import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";

const store = configureStore({
    reducer:{
        userReducer,
        cartReducer,
        orderReducer,
    }
})

export default store;