import { createSlice } from "@reduxjs/toolkit";
import Users from "../../utils/users.json"

const SignInSlice = createSlice({

    name: "signIn",
    initialState : {
        // users : [...Users]
        isAuthenticated: false,
        user: null,
        error: null,
        userEmail: '',
        userEmailError: false,
    },

    reducers: {
        checkCredentials: (state, action) => {
            const {emailTyped, passwordTyped} = action.payload;
            const user = Users.find((u) => u.email === emailTyped && u.password === passwordTyped);

            if(user){
                state.isAuthenticated = true;
                state.user = user;
                state.error = null;
            }else{
                state.isAuthenticated = false;
                state.user = null;
                state.error = "Invalid email or password.";
            }

        },

        setUserEmail : (state, action) => {
            const email = action.payload;
            const isEmail = Users.find((u) => u.email === email);
            if(isEmail) {
                state.userEmail = email;
                state.userEmailError = false;
                console.log(state.userEmail);
            }
            else{
                state.userEmailError = true

            }
            
            
        },

        changePassword: (state, action) => {
            const password = action.payload;
            const userIndex = Users.findIndex((u) => u.email == state.userEmail);
            if(userIndex !== -1){
                Users[userIndex].password = password;
                state.user = Users[userIndex]
            }
            

        }

    }
    
})

export const {checkCredentials, setUserEmail, changePassword} = SignInSlice.actions;

export default SignInSlice.reducer;