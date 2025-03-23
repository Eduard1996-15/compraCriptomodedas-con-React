import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";  
import { useDispatch } from "react-redux";
import { useNavigate,Link } from 'react-router-dom';
import { agregarUnaTransaccion, resetearTransaccion, addTransaccion } from "../features/transaccionSlice";
import {resetearUsuario} from "../features/usuarioSlice";
import {resetearMoneda} from "../features/monedaSlice";



const urlBase = 'https://crypto.develotion.com/';
const CrearTransaccion = () => {

    let navigate = useNavigate();
    //recupero datos
    const monedasguardadas = useSelector(state => state.monedasglobal.moneda); 
    const transaccionesGuardadas = useSelector(state => state.transaccionesglobal.transaccion);
    const [activar, setActivar] = useState(false);
   
    const token = useSelector(state => state.usuarioglobal.usuario.token);
    const idUsu = parseInt(useSelector(state => state.usuarioglobal.usuario.idUsu));
    const dispatch = useDispatch();
    
    let tipo = useRef(null);
    let valor = useRef(0);
    let cotizacion = useRef(0);
    let res = "";

    const [sugererncia, setSugererncia] = useState("");
    const [idmoneda, setIdMoneda] = useState(0);
    const [valormoneda, setValormoneda] = useState(0);
   
 useEffect(() => {
    if(token === null || token === undefined || token === ""){ 
        navigate("/Login");
        dispatch(resetearUsuario());
        dispatch(resetearTransaccion());
        dispatch(resetearMoneda());
        window.location.reload();
      } 
    });

    /*IA para sugerir operaciones: tomando como referencia la última
         transacción que se haya hecho en cada moneda (en las que se
        hayan hecho transacciones), verificar para informarle al usuario si es
        un buen momento para comprar o vender. Si la última operación con
        una moneda fue de compra y ahora el valor de la moneda es mayor
        que al momento de la compra la aplicación sugerirá vender esa
        cantidad de cripto monedas. Lo mismo se deberá hacer para el caso
        inverso. */

     
    useEffect(() => {
        
        //guardar el id de la moneda y el tipo de operacion de las ultimas transacciones
        for (let i = transaccionesGuardadas.length-1; i > 0; i--) {
            
             const unaTran = transaccionesGuardadas[i];
          if (unaTran.moneda === idmoneda) {//si la moneda es la misma que la que se esta buscando
                if (unaTran.tipo_operacion === 1) {//la operacion es de compra
                    if (unaTran.valor_actual < valormoneda) {//si el valor actual es mayor que el valor de la compra anterior
                        setSugererncia(`es buen momento para vender valor actual ${cotizacion.current.value} valor comprado ${unaTran.valor_actual}  ( ultima operacion  'compra' )`);//sugerencia de vender
                        break;
                    } else {
                        setSugererncia(`es buen momento para comprar valor actual ${cotizacion.current.value} valor comprado ${unaTran.valor_actual}  ( ultima operacion  'compra' )`);//sugerencia de comprar
                        break;
                    }
                }else{//la operacion es de venta
                    if (unaTran.valor_actual > valormoneda) {//si el valor actual es menor que el valor de la venta anterior
                        setSugererncia(`es buen momento para comprar  valor actual ${cotizacion.current.value} valor comprado ${unaTran.valor_actual} ( ultima operacion  'venta' )`);//sugerencia de comprar
                        break;
                    } else {
                        setSugererncia(`es buen momento para vender valor actual ${cotizacion.current.value} valor comprado ${unaTran.valor_actual}  ( ultima operacion  'venta' )`);//sugerencia de vender
                        break;
                    }
                }
            }else{//si la moneda es diferente a la que se esta buscando
                setSugererncia("Sin Movimientos con esa Moneda");//no hay sugerencia
            }
        }
    },[activar]);


     const llenarslectMonedas = (mon) => {
        if( mon !== undefined){
        let select = document.getElementById('cripto');
        select.innerHTML = "";
        select.innerHTML = mon.map(moneda => `<option  value="${moneda.id}">${moneda.nombre}</option>`).join('');
        }}

    useEffect(() => {
        llenarslectMonedas(monedasguardadas);
     },[]);

    const verValue = () => {
        let select = document.getElementById('cripto'); 
        let id = select.value;
        monedasguardadas.forEach(moneda => {
             if (moneda.id === id){
              document.getElementById('valor').value = moneda.cotizacion;
              setIdMoneda(parseInt(id));
              setValormoneda(moneda.cotizacion);
              if(activar){
                setActivar(false);
              }else{
                setActivar(true);
              }
            } 
        })
    }

    const crearTransaccion = (Transaccion) => {
        res = "";
        document.querySelector('#respuesta').innerHTML = res;
        fetch(urlBase + 'transacciones.php', {
            method: 'POST',
            headers: {
                'apiKey': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Transaccion)
        })
            .then(response => response.json())
            .then(data => {
                if (data.codigo === 200 || data.codigo === 201) {
                    res = "La transacción ha sido creada correctamente";
                    let t = {
                        cantidad: Transaccion.cantidad,
                        id: data.idTransaccion,
                        moneda: Transaccion.moneda,
                        tipo_operacion: Transaccion.tipoOperacion,
                        usuarios_id: Transaccion.idUsuario,
                        valor_actual: Transaccion.valorActual,
                    }
                    dispatch(agregarUnaTransaccion(t));
                } else {
                    res = "La transacción no ha sido creada";
                }
                document.querySelector('#respuesta').innerHTML = res;
            })
            .catch(error => console.log(error));
    }

    const Crear = () => {
        document.querySelector('#respuesta').innerHTML = "";
        let tipo = parseInt(document.getElementById('tipo').value);
        let criptomoneda = parseInt(document.getElementById('cripto').value);
        let cantidad = parseInt(document.getElementById('cantidad').value);
        let valor = parseInt(document.getElementById('valor').value);
        if (esvalido(tipo, criptomoneda, cantidad, valor) === false) {
            document.querySelector('#respuesta').innerHTML = "* debe llenar los campos correctamente";
        }
        else {
            let id = parseInt(localStorage.getItem('idUsu'));
            let Transaccion = {

                idUsuario: id,
                tipoOperacion: tipo,
                moneda: criptomoneda,
                cantidad: cantidad,
                valorActual: valor
            }
            crearTransaccion(Transaccion);
        }
    }
    const esvalido = (tipo, criptomoneda, cantidad, valor) => {
        if((tipo === 1  || tipo === 2) && criptomoneda >0 && cantidad >0 && valor >0){
            return true;
        }
        return false;
    }


    return (

        <div className="bg-light" style={{ marginTop: 20, padding: 20 }}>

            <div className="h3">
                <h3>Compra Venta de Transacciones</h3>
                <h5>{sugererncia}</h5>
                <form id="miFormulario"  >
                   

                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-4">
                            <label htmlFor="cripto">Criptomoneda</label>
                            <select name="cripto" id="cripto" className="form-select form-select-lg text-center" onChange={verValue} ref={valor} required>
                                <option value="">Seleccione una criptomoneda</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <label htmlFor="cantidad">Cantidad</label>
                            <input className="form-control form-control-lg text-center" id="cantidad" type="number" min="1" max="1000" placeholder="0" required />
                        </div>
                        <div className="col-4">
                            <label htmlFor="valor">Valor Actual por Moneda</label>
                            <input type="number" ref={cotizacion} placeholder='0' readOnly name="valor" id="valor"></input>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-6">
                            <label htmlFor="tipo">Tipo</label>
                            <select name="tipo" ref={tipo} id="tipo"   >
                                <option value="">Seleccione un tipo</option>
                                <option value="1">Compra</option>
                                <option value="2">Venta</option>
                            </select>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col">
                            < input type="button" value={"Crear"} className="btn btn-primary btn-lg" onClick={Crear}></input>
                        </div>
                    </div>
                    <p id="respuesta" className="text-center"></p>
                </form>
            </div>

        </div>

    )
}

export default CrearTransaccion