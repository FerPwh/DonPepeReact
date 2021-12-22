import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductoDataService from "../services/ProductosService";

const AddProductos = () => {
  const initialProductState = {
    codproducto: null,
    nombre:'',
    marca:'',
    cantidad:0,
    vencimiento:0,
    idcategoria:0,
    precio:0
  };
  const [currentProducto, setProducto] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProducto({ ...currentProducto, [name]: value });
  };

  const saveProducto = () => {
    var data = {
        nombre: currentProducto.nombre,
        marca: currentProducto.marca,
        cantidad: currentProducto.cantidad,
        vencimiento: currentProducto.vencimiento,
        idcategoria: currentProducto.idcategoria,
        precio: currentProducto.precio
    };

    ProductoDataService.create(data)
      .then(response => {
        setProducto({
            codproducto: response.data.codproducto,
            nombre: response.data.nombre,
            marca: response.data.marca,
            cantidad: response.data.cantidad,
            vencimiento: response.data.vencimiento,
            idcategoria: response.data.idcategoria,
            precio: response.data.precio
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProducto = () => {
    setProducto(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Se agrego correctamente el producto</h4>
          <button className="btn btn-success" onClick={newProducto}>
            Agregar otro
          </button>
          <Link to={"/productos"} className="btn btn-secondary" style={{ marginLeft: "10px" }}>
              Volver
          </Link>
        </div>
      ) : (
        <div>
          <h4>Nuevo Producto</h4>
          <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                required
                value={currentProducto.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="marca">Marca</label>
              <input
                type="text"
                className="form-control"
                id="marca"
                name="marca"
                required
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
                required
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
                required
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
                required
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
                required
                value={currentProducto.precio}
                onChange={handleInputChange}
              />
            </div>          

          <button onClick={saveProducto} className="btn btn-success">
            Agregar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProductos;
