import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    moneda:[]
}

export const monedaSlice = createSlice({
    name: "moneda",
    initialState,
    reducers: {
        addMonedas: (state, action) => {
            state.moneda = action.payload;
        },
        resetearMoneda: (state) => {
            state.moneda = [];
        }

    }
});

export const { addMonedas, resetearMoneda} = monedaSlice.actions;
export default monedaSlice.reducer;