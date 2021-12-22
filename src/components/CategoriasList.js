import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import CategoriaDataService from "../services/CategoriasService";
import { useTable } from "react-table";

const CategoriasList = (props) => {
  const [categorias, setCategorias] = useState([]);
  const categoriasRef = useRef();

  categoriasRef.current = categorias;

  useEffect(() => {
    retrieveCategorias();
  }, []);

  const retrieveCategorias = () => {
    CategoriaDataService.getAll()
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

   const openCategoria = (rowIndex) => {
    const id = categoriasRef.current[rowIndex].idcategoria;
    props.history.push("/categorias/" + id);
  };

  const deleteCategoria = (rowIndex) => {
    const nombre = categoriasRef.current[rowIndex].nombre;
    if (window.confirm('¿Estas seguro que deseas eliminar '+ nombre + '?')) {
      const id = categoriasRef.current[rowIndex].idcategoria;
      CategoriaDataService.remove(id)
        .then((response) => {
          props.history.push("/categorias");
  
          let newCategorias = [...categoriasRef.current];
          newCategorias.splice(rowIndex, 1);
  
          setCategorias(newCategorias);
        })
        .catch((e) => {
          console.log(e);
        });
    }


  };

  const columns = useMemo(
    () => [
      {
        Header: "Nro categoria",
        accessor: "idcategoria",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          console.log(props.row.id)
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openCategoria(rowIdx)}>
                <button className="btn btn-info" style={{ marginRight: "10px" }}>
                  <i className="far fa-edit action"></i>
                </button>                 
              </span>

              <span onClick={() => deleteCategoria(rowIdx)}>
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
    data: categorias,
  });

  return (
    <div className="list row">
      <div className="col-md-12 " style={{ marginBottom: "10px" }}>
        <h1 className="display-3 text-center">Listado de Categorias</h1>
      </div>
      <div className="col-md-12" style={{ marginBottom: "10px" }}>
        <Link to={"/add/categorias"} className="btn btn-info">
          Nueva Categoria
        </Link>
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
    </div>
  );
};

export default CategoriasList;
