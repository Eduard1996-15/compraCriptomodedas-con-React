import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transaccion:[]
}

export const transaccionSlice = createSlice({
    name: "transaccion",
    initialState,
    reducers: {
        addTransaccion: (state, action) => {
            state.transaccion=(action.payload);
        },
        agregarUnaTransaccion: (state, action) => {
            state.transaccion.push(action.payload);
        },
        resetearTransaccion: (state) => {
            state.transaccion = [];
        }

    }
});

export const { agregarUnaTransaccion,addTransaccion, resetearTransaccion } = transaccionSlice.actions;
export default transaccionSlice.reducer;