import React, { useState, useRef, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { guardarUsuario } from '../features/usuarioSlice';

const Login = () => {
  const dispatch = useDispatch();
  let idUsu = 0;
  let token = "";
  let usu = useRef(null);
  let pas = useRef(null);
  const urlBase = 'https://crypto.develotion.com/';
  const [miLogin, setMiLogin] = useState('false');
  const [miPassword, setPassword] = useState('');
  const [miUsuario, setUsuario] = useState('');
  let Logueo;
  let navigate = useNavigate();
  useEffect(() => {
    let u = usu.current.value;
    let p = pas.current.value;
    if (u != "" && p != "") {
      //muestro botom de login
      document.getElementById('logi').style.display = 'block';
      document.getElementById('logi').style = 'margin-left: 50px; text-align: center;';
    }
    else {
      //oculto boton de login
      document.getElementById('logi').style.display = "none";
    }
  }
  );

  Logueo = (Usuario) => {
    let res = "";
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
          res = "Usuario o contraseña incorrectos";
          document.querySelector('#res').innerHTML = res;

        } else {
          console.log(data);
          token = data.apiKey;//guardamos el token
         
          idUsu = data.id;//guardamos el idUsuario
          if (token !== "" && token !== undefined)
           localStorage.setItem('token', token);
           localStorage.setItem('idUsu', idUsu);
           localStorage.setItem('nom', Usuario.usuario);
           let u = {'token':token, 'idUsu':idUsu};
            dispatch((guardarUsuario(u)));
           if(data.codigo === 200){
            navigate('/Dashboard');
            res = "El usuario ha sido logueado correctamente";
            }else{
              res = "Usuario y/o contraseña incorrectos";
              navigate('/Dashboard');
            }
          
        }
        document.querySelector('#res').innerHTML = res;

      })
      .catch(error => console.log(error));
  }
  function iniciarSesion(e) {
    e.preventDefault();
    let txtusu = document.getElementById('txtusu').value;
    let txtpass = document.getElementById('txtpas').value;
    if (txtusu === "" || txtpass === "") {
      alert('Debe ingresar usuario y contraseña');
    }
    else {
      if (Validar(txtusu, txtpass)) {

        setUsuario(txtusu);
        setPassword(txtpass);
        const Usuario = {
          usuario: txtusu,
          password: txtpass
        };
        Logueo(Usuario);
      }
      else {
        setMiLogin('false');
        alert('Usuario o contraseña incorrectos');
      }
    }
  }
  function Validar(usuario, password) {
    if (usuario === "" || password === "" || usuario === null || password === null) {
      return false;
    }
    return true;
    
  }

  return (
    <div className="container-fluid " style={{ background: "lightgray", marginTop: 20, padding: 20 }}>
      <div id="log">
        <form id="form_login">
          <div>
            <h1 style={{ color: "blue", textalign: "center" }}>LOGIN</h1>
            <label htmlFor="txtusu"><strong>Username</strong></label>
            <input type="text" ref={usu} id="txtusu" style={{ textAlign: "center" }} placeholder='usuario' className="form-control" onChange={(e) => setUsuario(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="txtpas"><strong>Password</strong></label>
            <input type="password" ref={pas} id="txtpas" style={{ textAlign: "center" }} placeholder='clave' className="form-control" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <p id='res'></p>
          <button type="buttom" id='logi' onClick={iniciarSesion} className="btn btn-primary ">Iniciar Sesión</button> <br />
          <Link to="/">Crear cuenta</Link>
          <br />
        </form>
      </div>
    </div>
  )
}

export default Login