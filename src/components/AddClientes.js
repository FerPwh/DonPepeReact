import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClienteDataService from "../services/ClientesService";

const AddClientes = () => {
  const initialClientState = {
    idcliente: null,
    nombre:'',
    apellido:'',
    dni:0,
    edad:0
  };
  const [currentCliente, setCliente] = useState(initialClientState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCliente({ ...currentCliente, [name]: value });
  };

  const saveCliente = () => {
    var data = {
        nombre: currentCliente.nombre,
        apellido: currentCliente.apellido,
        dni: currentCliente.dni,
        edad: currentCliente.edad
    };

    ClienteDataService.create(data)
      .then(response => {
        setCliente({
            idcliente: response.data.idcliente,
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            dni: response.data.dni,
            edad: response.data.edad
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCliente = () => {
    setCliente(initialClientState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Se agrego: {currentCliente.nombre} {currentCliente.apellido}</h4>
          <button className="btn btn-success" onClick={newCliente}>
            Agregar otro
          </button>
          <Link to={"/clientes"} className="btn btn-secondary" style={{ marginLeft: "10px" }}>
              Volver
          </Link>
        </div>
      ) : (
        <div>
          <h4>Nuevo Cliente</h4>
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
                required
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
                required
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
                required
                value={currentCliente.edad}
                onChange={handleInputChange}
              />
            </div>         
          <button onClick={saveCliente} className="btn btn-success">
            Agregar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddClientes;
