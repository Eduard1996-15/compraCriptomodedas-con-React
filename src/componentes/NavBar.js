import { NavLink } from 'react-router-dom'
import { MontoTotal } from './MontoTotal';
import { resetearMoneda } from '../features/monedaSlice';
import { resetearTransaccion   } from '../features/transaccionSlice';
import { resetearUsuario } from '../features/usuarioSlice';
import { useSelector, useDispatch } from 'react-redux';


export const Navbar = () => {
    const dispatch = useDispatch();
    const salir = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('idUsu');
        dispatch(resetearUsuario());
        dispatch(resetearTransaccion());
        dispatch(resetearMoneda());
        window.location.reload();
        
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                 <NavLink  className="nav-item nav-link" onClick={salir} to="/">Logout</NavLink><br/>
                <br/>
               <div>[ Usuario ] : {localStorage.getItem('nom')} <MontoTotal/></div>
        </nav>
    )
}