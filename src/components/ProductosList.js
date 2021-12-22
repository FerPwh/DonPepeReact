import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import ProductoDataService from "../services/ProductosService";
import { useTable } from "react-table";

const ProductosList = (props) => {
  const [productos, setProductos] = useState([]);
  const [searchMarca, setSearchMarca] = useState("");
  const productosRef = useRef();

  productosRef.current = productos;

  useEffect(() => {
    retrieveProductos();
  }, []);

  const onChangeSearchMarca = (e) => {
    const searchMarca = e.target.value;
    setSearchMarca(searchMarca);
  };

  const retrieveProductos = () => {
    ProductoDataService.getAll()
      .then((response) => {
        setProductos(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProductos();
  };

  const removeAllProductos = () => {
    if (window.confirm('Estas seguro de eliminar todo?')) {
      // Save it!
      ProductoDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
    }
  };

  const findByMarca = () => {
    ProductoDataService.findByMarca(searchMarca)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openProducto = (rowIndex) => {
    const id = productosRef.current[rowIndex].codproducto;
    props.history.push("/productos/" + id);
  };

  const deleteProducto = (rowIndex) => {
    const nombreproducto = productosRef.current[rowIndex].nombre;
    if (window.confirm('¿Estas seguro que deseas eliminar '+ nombreproducto + '?')) {
      const id = productosRef.current[rowIndex].codproducto;
      ProductoDataService.remove(id)
        .then((response) => {
          props.history.push("/productos");
  
          let newProductos = [...productosRef.current];
          newProductos.splice(rowIndex, 1);
  
          setProductos(newProductos);
        })
        .catch((e) => {
          console.log(e);
        });
    }


  };

  const columns = useMemo(
    () => [
      {
        Header: "CodProducto",
        accessor: "codproducto",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Marca",
        accessor: "marca",
      },
      {
        Header: "Cantidad",
        accessor: "cantidad",
      },
      {
        Header: "Vencimiento",
        accessor: "vencimiento",
      },
      {
        Header: "ID Categoria",
        accessor: "idcategoria",
      },
      {
        Header: "Precio",
        accessor: "precio",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          console.log(props.row.id)
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openProducto(rowIdx)}>
                <button className="btn btn-info" style={{ marginRight: "10px" }}>
                  <i className="far fa-edit action"></i>
                </button>                 
              </span>

              <span onClick={() => deleteProducto(rowIdx)}>
                <button className="btn btn-danger">
                  <i className="fas fa-trash action"></i>
                </button> 
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: productos,
  });

  return (
    <div className="list row">
      <div className="col-md-12 " style={{ marginBottom: "10px" }}>
        <h1 className="display-3 text-center">Listado de Productos</h1>
      </div>      
      <div className="col-md-12" style={{ marginBottom: "10px" }}>
        <Link to={"/add/productos"} className="btn btn-info">
          Nuevo producto
        </Link>
      </div>      
      <div className="col-md-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por marca"
            value={searchMarca}
            onChange={onChangeSearchMarca}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByMarca}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllProductos}>
          Eliminar Todo
        </button>
      </div>
    </div>
  );
};

export default ProductosList;
