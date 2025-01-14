import { createSlice } from "@reduxjs/toolkit";
import Users from "../../utils/users.json"

const SignInSlice = createSlice({

    name: "signIn",
    initialState : {
        stateUsers : [...Users],
        isAuthenticated: false,
        createUserError: false,
        user: null,
        error: null,
        userEmail: '',
        userEmailError: false,
    },

    reducers: {
        checkCredentials: (state, action) => {
            const {emailTyped, passwordTyped} = action.payload;
            const user = state.stateUsers.find((u) => u.email === emailTyped && u.password === passwordTyped);

            if(user){
                state.isAuthenticated = true;
                state.user = user;
                state.error = null;
            }else{
                state.isAuthenticated = false;
                state.user = null;
                state.error = "Invalid email or password.";
            }
            console.log(JSON.stringify(state.stateUsers));
            console.log(JSON.stringify(state.user))
        },

        setUserEmail : (state, action) => {
            const email = action.payload;
            const isEmail = state.stateUsers.find((u) => u.email === email);
            if(isEmail) {
                state.userEmail = email;
                state.userEmailError = false;
                
                console.log(state.userEmail);
            }
            else{
                state.userEmailError = true
            }
        },

        setFalse: (state) =>{
            state.userEmailError = false;
            state.userEmail = '';

        },

        changePassword: (state, action) => {
            const password = action.payload;
            const userIndex = state.stateUsers.findIndex((u) => u.email == state.userEmail);
            if(userIndex !== -1){
                state.stateUsers[userIndex] = {
                    ...state.stateUsers[userIndex],
                    password,
                  };
                state.user = state.stateUsers[userIndex];
                state.user = null;

            }
            console.log("Updated user:", JSON.stringify(state.stateUsers));
        },

        createUser: (state, action) => {
            const newUser = action.payload;
            console.log(newUser)
            const userExist = state.stateUsers.find(u => u.email === newUser.email);
            if(userExist){
                state.createUserError = true;
            }
            else{
                state.stateUsers.push({id: state.stateUsers.length + 1 , ...newUser})
                state.createUserError = false
            }
            console.log(Users);
            console.log("Updated new user:", JSON.stringify(state.stateUsers));
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },

        resetErrors: (state) => {
            state.error = null;
            state.createUserError = false;
            state.userEmailError = false;
        },
        
    }
})

export const {createUser, checkCredentials, setUserEmail, setFalse, changePassword, logout, resetErrors} = SignInSlice.actions;

export default SignInSlice.reducer;