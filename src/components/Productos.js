import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductoDataService from "../services/ProductosService";

const Producto = props => {
  const initialProductState = {
    codproducto: null,
    nombre:'',
    marca:'',
    cantidad:0,
    vencimiento:0,
    idcategoria:0,
    precio:0
  };
  const [currentProducto, setCurrentProducto] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProducto = id => {
    ProductoDataService.get(id)
      .then(response => {
        setCurrentProducto(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProducto(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProducto({ ...currentProducto, [name]: value });
  };

  const updateProducto = () => {
    console.log(currentProducto)
    ProductoDataService.update(currentProducto.codproducto, currentProducto)
      .then(response => {
        console.log(response.data);
        alert("El producto fue actualizado");
        props.history.push("/productos");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProducto = () => {
    ProductoDataService.remove(currentProducto.codproducto)
      .then(response => {
        console.log(response.data);
        props.history.push("/productos");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProducto ? (
        <div className="edit-form">
          <h4>Edicion {currentProducto.nombre}</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentProducto.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Marca</label>
              <input
                type="text"
                className="form-control"
                id="marca"
                name="marca"
                value={currentProducto.marca}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                name="cantidad"
                value={currentProducto.cantidad}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vencimiento">Vencimiento</label>
              <input
                type="number"
                className="form-control"
                id="vencimiento"
                name="vencimiento"
                value={currentProducto.vencimiento}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="idcategoria">ID Categoria</label>
              <input
                type="number"
                className="form-control"
                id="idcategoria"
                name="idcategoria"
                value={currentProducto.idcategoria}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                value={currentProducto.precio}
                onChange={handleInputChange}
              />
            </div>                                                            
          </form>
          <button type="submit" className="btn btn-success mr-2" onClick={updateProducto}>
            Actualizar
          </button>
          <button className="btn btn-danger" onClick={deleteProducto}>
            Eliminar
          </button>          
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />  
          <h2>El producto con codigo: <span style={{ color: "red" }}>{props.match.params.id}</span> no existe.</h2>
          <Link to={"/productos"} className="btn btn-secondary">
              Volver
          </Link>
        </div>
      )}
    </div>
  );
};

export default Producto;
