import CrearTransaccion from "../componentes/CrearTransaccion"
import Listar from "../componentes/Listar";
import Estadisticas from "../componentes/Estadisticas";
import Menu from "../componentes/Menu";
import Login from "../componentes/Login";
import { Navbar } from "../componentes/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Registro from "../componentes/Registro";

const AppRouters = () => {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/CrearTransaccion" element={<CrearTransaccion />} />
                <Route path="/Listar" element={<Listar />} />
                <Route path="/Estadisticas" element={<Estadisticas />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registro" element={<Registro />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouters