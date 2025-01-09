import { configureStore } from "@reduxjs/toolkit";
import signInReducer from './Slice/SignInSlice'

export const Store = configureStore({
    reducer: {
        signIn : signInReducer
    }

   
})