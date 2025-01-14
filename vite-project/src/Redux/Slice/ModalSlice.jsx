import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name : "ModalSlice",
    initialState: {
        type : "",
        // isLoggedIn : false,
    },

    reducers: {
        openModal: (state, action) => {
            const modalType = action.payload
            state.type = modalType;
            console.log(state.type);
        },
        // setLoggedIn: (state) =>{
        //     state.isLoggedIn = !state.isLoggedIn;
        // }
    }
})

export const {openModal} = ModalSlice.actions

export default ModalSlice.reducer;