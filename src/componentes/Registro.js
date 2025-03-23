import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const urlBase = 'https://crypto.develotion.com/';
let ciudades = [];
let departamentos = [];
const Registro = () => {
  let navigate = useNavigate();
  let dep = useRef(null);
  useEffect(() => {
    document.getElementById('departamento').innerHTML = "";
    fetch(urlBase + 'departamentos.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        departamentos = data.departamentos;
        llenarSelectDepartamentos(departamentos);
      })
      .catch(error => console.log(error));
  },[]);

  const llenarSelectDepartamentos = (departamentos) => {
    let select = document.getElementById('departamento');
    select.innerHTML = "";
    select.innerHTML = departamentos.map(departamento => `<option value="${departamento.id}">${departamento.nombre}</option>`).join('');
  };
  const mostrarCiudades = () => {
    let idDepart = dep.current.value;
    getCiudades(idDepart);
  };

  const getCiudades = (idDepart) => {
    fetch(`${urlBase}ciudades.php?idDepartamento=${idDepart}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        ciudades = data.ciudades;
        if (ciudades.length > 0) {
          llenarSelectCiudades(ciudades);
        } else {
          document.getElementById('ciudad').innerHTML = "";
        }
      })
      .catch(error => console.log(error));
  }
  const llenarSelectCiudades = (ciudades) => {
    //llenar select usando map
    let selectCiudades = document.getElementById('ciudad'); //obtenemos el select
    selectCiudades.innerHTML = ""; //limpiamos el select
    selectCiudades.innerHTML = ciudades.map(ciudad => `<option value="${ciudad.id}">${ciudad.nombre}</option>`).join('');//llenamos el select
  }

 const  ValidarRegistro = (usuario, password, departamento, ciudad) => {
    return ((!validar_usuario(usuario)) || (!validar_clave(password)) || departamento === ""
        || ciudad === ""  || departamento === null || ciudad === null  ) ? false : true;
}
const validar_usuario = (usuario) => {
  if (usuario === "" || usuario === null || usuario.length < 3) {
    return false;
  } else {
    return true;
  }
}

  const  validar_clave =(contrasenia) =>{

    if(contrasenia.length >= 4)//largo de la clave minimo 4
    {		
        let mayuscula = false;
        let minuscula = false;
        let numero = false;
        
        for(let i = 0;i<contrasenia.length;i++)//recorro la misma 
        {
            if(contrasenia.charCodeAt(i) >= 65 && contrasenia.charCodeAt(i) <= 90)
            {
                mayuscula = true;//uso los charcode para saber si tiene mayusculas
            }
            else if(contrasenia.charCodeAt(i) >= 97 && contrasenia.charCodeAt(i) <= 122)
            {
                minuscula = true;//uso los charcode para saber si tiene minusculas
            }
            else if(contrasenia.charCodeAt(i) >= 48 && contrasenia.charCodeAt(i) <= 57)
            {
                numero = true;////uso los charcode para saber si tiene numeros
            }
        }
        if(mayuscula == true && minuscula == true &&  numero == true)//si tiene todo
        {
            return true;//es verdadero
        }
    }
    return false;//si no falso
}
const Registrar =()=>{
  let usuario = document.getElementById('usuario').value;
  let departamento = parseInt(document.getElementById('departamento').value);
  let ciudad = parseInt(document.getElementById('ciudad').value);
  let password = document.getElementById('password').value;
  if (!ValidarRegistro(usuario, password, departamento, ciudad)) {
      document.querySelector('#res').innerHTML = "* usuario o password incorrectos <br> * Usuario debe tener minimo 3 caracteres <br> * La clave debe tener al menos 4 caracteres <br> * Seleccione un departamento y una ciudad";
  }
  else {
      const Usuario = {
          usuario: usuario,
          password: password,
          idDepartamento: departamento,
          idCiudad: ciudad
      };
      registrarUsuario(Usuario);
      console.log(Usuario);
  }
}

const registrarUsuario = (Usuario) => {
  
  let res;
  fetch(urlBase + 'usuarios.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(Usuario)
  })
      .then(response => response.json())
      .then(data => {
          if(data.codigo === 200){
              res = "El usuario ha sido creado correctamente";
              navigate('/login');
          }
          else{
              res = "El usuario ya existe";
          }
          document.querySelector('#res').innerHTML = res;
      })
      .catch(error => console.log(error));
}

  return (
    <div id="registro">
      <br />
      <h2>Registro</h2>
      <label htmlFor="usuario">Usuario</label>
      <input type="text" placeholder='usuario' required="required" className="usuario" id="usuario" />
      <br></br>
      <label htmlFor="password">Password</label>
      <input type="password" placeholder='clave' required="required" name="password" id="password" />
      <br></br>
      <label htmlFor="departamento">Departamento</label>
      <select name="departamento" ref={dep} id="departamento" onChange={mostrarCiudades} >
        <option value="">Seleccione un departamento</option>
      </select>
      <br></br>
      <label htmlFor="ciudad">Ciudad</label>
      <select name="ciudad" id="ciudad">
        <option value="">Seleccione una Ciudad</option>
      </select>
      <br /><br />
      <input type="submit" id="registrar" value="Registrar" onClick={Registrar} /> <br />
      <Link to="/Login">Ya tienes cuenta?</Link>
      <p id="res"></p>

    </div>
  )
}


export default Registro