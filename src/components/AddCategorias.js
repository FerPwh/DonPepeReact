import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoriaDataService from "../services/CategoriasService";

const AddCategorias = () => {
  const initialCategoryState = {
    idcategoria: null,
    nombre:''
  };
  const [currentCategoria, setCategoria] = useState(initialCategoryState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCategoria({ ...currentCategoria, [name]: value });
  };

  const saveCategoria = () => {
    var data = {
        nombre: currentCategoria.nombre
    };

    CategoriaDataService.create(data)
      .then(response => {
        setCategoria({
            idcategoria: response.data.idcategoria,
            nombre: response.data.nombre
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCategoria = () => {
    setCategoria(initialCategoryState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Se agrego: {currentCategoria.nombre}</h4>
          <button className="btn btn-success" onClick={newCategoria}>
            Agregar otro
          </button>
          <Link to={"/categorias"} className="btn btn-secondary" style={{ marginLeft: "10px" }}>
              Volver
          </Link>
        </div>
      ) : (
        <div>
          <h4>Nueva Categoria</h4>
          <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                required
                value={currentCategoria.nombre}
                onChange={handleInputChange}
              />
            </div>         
          <button onClick={saveCategoria} className="btn btn-success">
            Agregar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCategorias;
