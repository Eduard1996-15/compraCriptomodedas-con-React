import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetearUsuario } from '../features/usuarioSlice';
import { resetearTransaccion } from '../features/transaccionSlice';
import { resetearMoneda } from '../features/monedaSlice';
import { useNavigate } from 'react-router-dom';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

let arr = [];
const GraficoVentas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cargo, setCargo] = useState(false);
  const monedas = useSelector(state => state.monedasglobal.moneda);
  const transacciones = useSelector(state => state.transaccionesglobal.transaccion);
  //const [array, setArray] = useState([]);
  useEffect(() => {
    if(monedas === null || monedas === undefined || monedas === ""){ 
        navigate("/Login");
        dispatch(resetearUsuario());
        dispatch(resetearTransaccion());
        dispatch(resetearMoneda());
        window.location.reload();
      } 
    });
    const cargarGraf=()=>{
      arr = [];
    monedas.forEach(mon => {
      let acumulador = 0;
      transacciones.forEach(transaccion => {
        if (transaccion.tipo_operacion == 2 && mon.id == transaccion.moneda) {
          acumulador += (transaccion.valor_actual * transaccion.cantidad);//guardo valor 
        }
      });
      //termino de sumar 
      //nombre de la moneda y valor acumulado
      const obj = { nombre: mon.nombre, total: acumulador }
      if (!sonRepetidos(obj,arr)) {
       arr.push(obj);
      }

    });
  if (arr.length > 0) {
    setCargo(true);
  }
    }

  useEffect(() => {
    cargarGraf();
}, [transacciones]);

const sonRepetidos = (obj, arr) => {
  let encontrado = false;
  arr.forEach(element => {
    if (element.nombre == obj.nombre) {
      encontrado = true;
    }
  });
  return encontrado;
}


return (
  <div>
    {cargo ? (
      <Bar options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Grafica de Ventas',
          },
        },
      }} data={{
        labels: arr.map((item) => item.nombre),
        datasets: [
          {
            label: 'Total vendido',
            data: arr.map((item) => item.total),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      }} />
    ) : (
      <div>Cargando...</div>
    )}
  </div>
)
}

export default GraficoVentas