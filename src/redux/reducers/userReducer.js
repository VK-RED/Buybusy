import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId : "",
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userId = action.payload;
        }
    }

})

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
const userSelector = (state) => state.userReducer.userId;

export {userActions, userReducer, userSelector};

