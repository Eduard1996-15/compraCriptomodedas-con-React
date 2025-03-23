
import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

let arrayMonedas = [];
const GraficoMoneda = () => {
    let mon = useRef(null);
    const [cargo, setCargo] = useState(false);
    const transaccionesGuardadas = useSelector(state => state.transaccionesglobal.transaccion);
    const monedasguardadas = useSelector(state => state.monedasglobal.moneda);
    const [arr, setArr] = useState([]);
    let res = "";
    //let idUsu = localStorage.getItem('idUsu');
    /*Gráfico para una moneda: se seleccionará de un combo
    desplegable una de las monedas disponibles y se mostrará un
    gráfico con las cotizaciones que tenía esa moneda al momento de
    cada una de las transacciones que hizo el usuario. */


    const verselect = () => {
        //llenar select de monedas
        let select = document.getElementById('moneda');
        select.innerHTML = "";
        select.innerHTML = monedasguardadas.map(moneda => `<option value="${moneda.id}">${moneda.nombre}</option>`).join('');
    };

    useEffect(() => {
        verselect();
    }, []);
   
    let monedanombre = "";

    
       
    const mostrarGrafica =() => {
        setArr([]);
        arrayMonedas = [];
        let monedaid = parseInt(mon.current.value);
        monedanombre = mon.current.options[mon.current.selectedIndex].text;
            let generaId=0;
        for (let i = 0; i < transaccionesGuardadas.length; i++) {
            let mone;
            if (transaccionesGuardadas[i].moneda == monedaid) {
                mone = transaccionesGuardadas[i].valor_actual;
                generaId = generaId +1;
                const obj = { id: generaId, nombre: monedanombre, total: mone }
                if (!sonRepetidos(obj, arrayMonedas)) {
                    arrayMonedas.push(obj);
                }
            }
        }
        if (arrayMonedas.length > 0) {
            setCargo(true);
            setArr(arrayMonedas);
        }

    }


    const sonRepetidos = (obj, arr) => {
        let encontrado = false;
        arr.forEach(element => {
            if (element.id == obj.id) {
                encontrado = true;
            }
        });
        return encontrado;
    }

    return (
        <div className='text-center'>

            <h4  >GraficoMoneda</h4>
            <label htmlFor="moneda">Monedas</label>
            <select name='moneda' id="moneda" ref={mon}  onChange ={mostrarGrafica} ></select>
            {cargo ? (<Bar options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Moneda',
                    },
                },
            }} data={{
                labels: arr.map((item) => item.nombre),
                datasets: [
                    {
                        label: 'Cotizacion',
                        data: arr.map((item) => item.total),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ],
            }} />) : <div>Cargando...</div>}
        </div>
    )
}

export default GraficoMoneda