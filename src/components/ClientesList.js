import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import ClienteDataService from "../services/ClientesService";
import { useTable } from "react-table";

const ClientesList = (props) => {
  const [clientes, setClientes] = useState([]);
  const clientesRef = useRef();

  clientesRef.current = clientes;

  useEffect(() => {
    retrieveClientes();
  }, []);

  const retrieveClientes = () => {
    ClienteDataService.getAll()
      .then((response) => {
        setClientes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

   const openCliente = (rowIndex) => {
    const id = clientesRef.current[rowIndex].idcliente;
    props.history.push("/clientes/" + id);
  };

  const deleteCliente = (rowIndex) => {
    const nombre = clientesRef.current[rowIndex].nombre;
    if (window.confirm('¿Estas seguro que deseas eliminar '+ nombre + '?')) {
      const id = clientesRef.current[rowIndex].idcliente;
      ClienteDataService.remove(id)
        .then((response) => {
          props.history.push("/clientes");
  
          let newClientes = [...clientesRef.current];
          newClientes.splice(rowIndex, 1);
  
          setClientes(newClientes);
        })
        .catch((e) => {
          console.log(e);
        });
    }


  };

  const columns = useMemo(
    () => [
      {
        Header: "Nro cliente",
        accessor: "idcliente",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Apellido",
        accessor: "apellido",
      },
      {
        Header: "DNI",
        accessor: "dni",
      },
      {
        Header: "edad",
        accessor: "edad",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          console.log(props.row.id)
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openCliente(rowIdx)}>
                <button className="btn btn-info" style={{ marginRight: "10px" }}>
                  <i className="far fa-edit action"></i>
                </button>                 
              </span>

              <span onClick={() => deleteCliente(rowIdx)}>
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
    data: clientes,
  });

  return (
    <div className="list row">
      <div className="col-md-12 " style={{ marginBottom: "10px" }}>
        <h1 className="display-3 text-center">Listado de Clientes</h1>
      </div>
      <div className="col-md-12" style={{ marginBottom: "10px" }}>
        <Link to={"/add/clientes"} className="btn btn-info">
          Nuevo Cliente
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

export default ClientesList;
