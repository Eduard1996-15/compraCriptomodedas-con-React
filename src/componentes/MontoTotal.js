import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export const  MontoTotal = () => {

    /*Monto final de inversiones: en un componente aparte, se deberá
mostrar el monto total invertido en criptomonedas. Para este cálculo
se deberá calcular de cada transacción el equivalente en pesos
uruguayos, para sumar todas las operaciones de compra y restar
todas las operaciones de venta. Este resultado podría ser negativo si
los montos de ventas terminan siendo mayores que los de compras.
 */
const [monto, setMonto] = useState(0);
let transaccionesGuardadas = useSelector(state => state.transaccionesglobal.transaccion);
 const calcularMontoTotal = (t) => {
            let m=0;
            t.forEach(element => {
                if (element.tipo_operacion == 1) {//compra
                    m += (element.valor_actual * element.cantidad);
                } else {//venta
                    m -= (element.valor_actual * element.cantidad);
                }
            });
            setMonto(m);
        }
   

useEffect(() => {
     calcularMontoTotal(transaccionesGuardadas);
},[transaccionesGuardadas]);

  return (
    <h3>MontoTotal: {monto}</h3>
  )
}
