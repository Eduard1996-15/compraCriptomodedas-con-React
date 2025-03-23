import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuario:{}
}

export const usuarioSlice = createSlice({
    name: "usuario",//nombre del slice
    initialState,//estado inicial
    reducers: {
        guardarUsuario: (state, action) => {
            state.usuario = action.payload;//agrega el usuario a la lista de usuarios
        },
        resetearUsuario: (state) => {
            state.usuario = {};//resetea el usuario
        }

    }
});

export const { guardarUsuario, resetearUsuario } = usuarioSlice.actions;//acciones para el slice
export default usuarioSlice.reducer;//devuelve el reducer del slice