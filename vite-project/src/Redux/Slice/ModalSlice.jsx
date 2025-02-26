import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name : "ModalSlice",
    initialState: {
        type : "",
        formType : 'signIn',
    },

    reducers: {
        openModal: (state, action) => {
            const modalType = action.payload
            state.type = modalType;
            console.log(state.type);
        },
        changeFormType: (state, action) => {
            const type = action.payload
            state.formType = type
            console.log('state.formType: ', state.formType);

        }


    }
});

console.log('Initial ModalSlice state:', ModalSlice.getInitialState());

export const {openModal , changeFormType} = ModalSlice.actions

export default ModalSlice.reducer;