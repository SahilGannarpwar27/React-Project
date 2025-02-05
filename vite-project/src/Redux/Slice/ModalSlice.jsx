import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name : "ModalSlice",
    initialState: {
        type : "",
    },

    reducers: {
        openModal: (state, action) => {
            const modalType = action.payload
            state.type = modalType;
            console.log(state.type);
        },
    }
})

export const {openModal} = ModalSlice.actions

export default ModalSlice.reducer;