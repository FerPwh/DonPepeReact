import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClienteDataService from "../services/ClientesService";

const Cliente = props => {
  const initialClientState = {
    idcliente: null,
    nombre:'',
    apellido:'',
    dni:0,
    edad:0
  };
  const [currentCliente, setCurrentCliente] = useState(initialClientState);
  const [message, setMessage] = useState("");

  const getCliente = id => {
    ClienteDataService.get(id)
      .then(response => {
        setCurrentCliente(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCliente(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCliente({ ...currentCliente, [name]: value });
  };

  const updateCliente = () => {
    console.log(currentCliente)
    ClienteDataService.update(currentCliente.idcliente, currentCliente)
      .then(response => {
        console.log(response.data);
        alert("El cliente se actualizo con exito");
        props.history.push("/Clientes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCliente = () => {
    ClienteDataService.remove(currentCliente.idcliente)
      .then(response => {
        console.log(response.data);
        props.history.push("/Clientes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCliente ? (
        <div className="edit-form">
          <h4>Edicion ({currentCliente.nombre} {currentCliente.apellido})</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentCliente.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                name="apellido"
                value={currentCliente.apellido}
                onChange={handleInputChange}
              />
            </div>            
            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <input
                type="number"
                className="form-control"
                id="dni"
                name="dni"
                value={currentCliente.dni}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edad">Edad</label>
              <input
                type="number"
                className="form-control"
                id="edad"
                name="edad"
                value={currentCliente.edad}
                onChange={handleInputChange}
              />
            </div>                                                           
          </form>
          <button type="submit" className="btn btn-success mr-2" onClick={updateCliente}>
            Actualizar
          </button>
          <button className="btn btn-danger" onClick={deleteCliente}>
            Eliminar
          </button>          
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />  
          <h2>El Cliente con codigo: <span style={{ color: "red" }}>{props.match.params.id}</span> no existe.</h2>
          <Link to={"/Clientes"} className="btn btn-secondary">
              Volver
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cliente;
