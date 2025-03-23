import React, { useEffect, useState} from 'react'
import CrearTransaccion from './CrearTransaccion';
import Estadisticas from './Estadisticas';
import Listar from './Listar';
import { Navbar } from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addMonedas } from '../features/monedaSlice';
import { addTransaccion } from '../features/transaccionSlice';
import {MontoTotal} from './MontoTotal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const idUsu = parseInt(useSelector(state => state.usuarioglobal.usuario.idUsu));
  const dispatch = useDispatch();
  const urlBase = 'https://crypto.develotion.com/';
  const token = useSelector(state => state.usuarioglobal.usuario.token);
  const [cargado, setCargado] = useState(false);
 let navigate = useNavigate();
  useEffect(() => {
     if(idUsu.toString() !== localStorage.getItem('idUsu')){
      navigate("/Login");
      window.location.reload();
    } 
    getMonedas();
    getTransacciones();
  }, []);
/* useEffect(() => {
    //ir a buscar las transacciones del usuario logeado
    //y buscar tambien monedas
     getMonedas();
    getTransacciones();

  },[]);
 */

  const getMonedas = () => {
     //MONEDAS
     fetch(`${urlBase}/monedas.php`, {
      method: 'GET',
      headers: {
        'apiKey': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error ) {
            let res;
            res = data.error + "No hay monedas";
        } else {
          let monedasA = data.monedas;
          dispatch(addMonedas(monedasA));
        }
      })
      .catch(error => console.log(error));
  }

 const getTransacciones = () => {
    //transacciones
        fetch(`${urlBase}transacciones.php?idUsuario=${idUsu}`, {
          method: 'GET',
          headers: {
            'apiKey': token,
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.error ) {
                let res;
                res = data.error  + "No hay transacciones";
            } else {
              let transaccionesA = data.transacciones;
              dispatch(addTransaccion(transaccionesA));
              setCargado(true);
            }
          }).catch(error => console.log(error));
   }


  return (
    <div className='container-fluid'>
        
        {cargado ?
          <div className='dash'>
             <Navbar />
       <h1>Dashboard</h1>
            <div className='box1'>
              <CrearTransaccion />
            </div>
            <div className='box2'>
              <Listar />
            </div>
            <div className='box3'>
              <Estadisticas />
            </div>
          </div> : null}
    </div>
  )
}

export default Dashboard