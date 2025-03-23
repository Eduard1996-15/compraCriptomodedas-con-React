import { useSelector } from "react-redux";
import { useEffect } from 'react';
const Listar = () => {


  const transaccionesGuardadas = useSelector(state => state.transaccionesglobal.transaccion);
  const token = useSelector(state => state.usuarioglobal.usuario.token);
  const idUsu = parseInt(useSelector(state => state.usuarioglobal.usuario.idUsu));


  useEffect(() => {
    listar();
  }, [transaccionesGuardadas]);
  const llenarTabla = (transacciones) => {
    let tbody = document.querySelector('#tbody');
    tbody.innerHTML = '';
    tbody.innerHTML = transacciones.map((transaccion) => {
      return `<tr>
              <td>${transaccion.moneda}</td>
              <td>${transaccion.tipo_operacion}</td>
              <td>${transaccion.cantidad}</td>
              <td>${transaccion.valor_actual}</td>
            </tr>`
    });
  }
  const listar = () => {
            llenarTabla(transaccionesGuardadas);
  }






  return (

    <div >

      <div className="h3">
        Listado De Transacciones
      </div>

      <div className="table-wrapper">

        <>
          <table >
            <thead >
              <tr>
                <th>Moneda</th>
                <th>tipo</th>
                <th>Cantidad</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody id="tbody">

            </tbody>
          </table>
        </>
      </div>

    </div>
  )
}

export default Listar