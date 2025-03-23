import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { guardarUsuario } from '../features/usuarioSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlBase = 'https://crypto.develotion.com/';
  
  // Referencias para los inputs
  const usu = useRef(null);
  const pas = useRef(null);
  
  // Estados
  const [miLogin, setMiLogin] = useState(false);
  const [miPassword, setPassword] = useState('');
  const [miUsuario, setUsuario] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Efecto para mostrar/ocultar botón de login
  useEffect(() => {
    if (usu.current && pas.current) {
      const u = usu.current.value;
      const p = pas.current.value;
      
      if (u !== "" && p !== "") {
        document.getElementById('logi').style.display = 'block';
        document.getElementById('logi').style.marginLeft = '50px';
        document.getElementById('logi').style.textAlign = 'center';
      } else {
        document.getElementById('logi').style.display = "none";
      }
    }
  }, [miUsuario, miPassword]); // Dependencias correctas

  const Logueo = (Usuario) => {
    fetch(urlBase + 'login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Usuario)
    })
      .then(response => response.json())
      .then(data => {
        if (data.codigo !== 200) {
          setMensaje("Usuario o contraseña incorrectos");
        } else {
          console.log("Login exitoso:", data);
          
          // Guardamos datos en localStorage
          localStorage.setItem('token', data.apiKey);
          localStorage.setItem('idUsu', data.id);
          localStorage.setItem('nom', Usuario.usuario);
          
          // Guardamos en Redux
          const u = {
            'token': data.apiKey, 
            'idUsu': data.id
          };
          dispatch(guardarUsuario(u));
          
          setMensaje("El usuario ha sido logueado correctamente");
          setMiLogin(true);
          
          // Navegación después de un pequeño delay para asegurar que todo se ha actualizado
          setTimeout(() => {
            navigate('/Dashboard');
          }, 100);
        }
      })
      .catch(error => {
        console.error("Error en login:", error);
        setMensaje("Error de conexión. Intente nuevamente.");
      });
  }

  const iniciarSesion = (e) => {
    e.preventDefault();
    
    const txtusu = usu.current.value;
    const txtpass = pas.current.value;
    
    if (txtusu === "" || txtpass === "") {
      alert('Debe ingresar usuario y contraseña');
      return;
    }
    
    if (Validar(txtusu, txtpass)) {
      setUsuario(txtusu);
      setPassword(txtpass);
      
      const Usuario = {
        usuario: txtusu,
        password: txtpass
      };
      
      Logueo(Usuario);
    } else {
      setMiLogin(false);
      alert('Usuario o contraseña incorrectos');
    }
  }

  const Validar = (usuario, password) => {
    return usuario !== "" && password !== "" && usuario !== null && password !== null;
  }

  return (
    <div className="container-fluid" style={{ background: "lightgray", marginTop: 20, padding: 20 }}>
      <div id="log">
        <form id="form_login">
          <div>
            <h1 style={{ color: "blue", textAlign: "center" }}>LOGIN</h1>
            <label htmlFor="txtusu"><strong>Username</strong></label>
            <input 
              type="text" 
              ref={usu} 
              id="txtusu" 
              style={{ textAlign: "center" }} 
              placeholder='usuario' 
              className="form-control" 
              onChange={(e) => setUsuario(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="txtpas"><strong>Password</strong></label>
            <input 
              type="password" 
              ref={pas} 
              id="txtpas" 
              style={{ textAlign: "center" }} 
              placeholder='clave' 
              className="form-control" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <p id='res'>{mensaje}</p>
          <button 
            type="button" 
            id='logi' 
            onClick={iniciarSesion} 
            className="btn btn-primary"
          >
            Iniciar Sesión
          </button>
          <br />
          <Link to="/">Crear cuenta</Link>
          <br />
        </form>
      </div>
    </div>
  )
}

export default Login
