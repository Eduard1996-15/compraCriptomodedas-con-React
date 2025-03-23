import { configureStore } from "@reduxjs/toolkit";  
import transaccionReducer from "../features/transaccionSlice";
import monedaReducer from "../features/monedaSlice";
import usuarioReducer from "../features/usuarioSlice";

export const store = configureStore({
    reducer: {
        transaccionesglobal: transaccionReducer,
        monedasglobal: monedaReducer,
        usuarioglobal: usuarioReducer
    }
});