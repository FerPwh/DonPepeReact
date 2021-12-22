import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriaDataService from "../services/CategoriasService";

const Categoria = props => {
  const initialCategoryState = {
    idcategoria: null,
    nombre:''
  };
  const [currentCategoria, setCurrentCategoria] = useState(initialCategoryState);
  const [message, setMessage] = useState("");

  const getCategoria = id => {
    CategoriaDataService.get(id)
      .then(response => {
        setCurrentCategoria(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategoria(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCategoria({ ...currentCategoria, [name]: value });
  };

  const updateCategoria = () => {
    console.log(currentCategoria)
    CategoriaDataService.update(currentCategoria.idcategoria, currentCategoria)
      .then(response => {
        console.log(response.data);
        alert("La categoria se actualizo con exito");
        props.history.push("/categorias");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCategoria = () => {
    CategoriaDataService.remove(currentCategoria.idcategoria)
      .then(response => {
        console.log(response.data);
        props.history.push("/categorias");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCategoria ? (
        <div className="edit-form">
          <h4>Edicion ({currentCategoria.nombre})</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentCategoria.nombre}
                onChange={handleInputChange}
              />
            </div>                                                     
          </form>
          <button type="submit" className="btn btn-success mr-2" onClick={updateCategoria}>
            Actualizar
          </button>
          <button className="btn btn-danger" onClick={deleteCategoria}>
            Eliminar
          </button>          
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />  
          <h2>El Categoria con codigo: <span style={{ color: "red" }}>{props.match.params.id}</span> no existe.</h2>
          <Link to={"/categorias"} className="btn btn-secondary">
              Volver
          </Link>
        </div>
      )}
    </div>
  );
};

export default Categoria;
