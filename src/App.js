import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddClientes from "./components/AddClientes";
import Clientes from "./components/Clientes";
import ClientesList from "./components/ClientesList";

import AddProductos from "./components/AddProductos";
import Productos from "./components/Productos";
import ProductosList from "./components/ProductosList";

import AddCategorias from "./components/AddCategorias";
import Categorias from "./components/Categorias";
import CategoriasList from "./components/CategoriasList";


function App() {
  return (
    <div>
      <nav className="navbar navbar-light navbar-expand" style={{ backgroundColor: "#e3f2fd" }}>
        <a href="/" className="navbar-brand">
          Programacion Web
        </a>
        <div className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link to={"/clientes"} className="nav-link">
              Clientes
            </Link>
          </li>           
          <li className="nav-item">
            <Link to={"/productos"} className="nav-link">
              Productos
            </Link>
          </li>  
          <li className="nav-item">
            <Link to={"/categorias"} className="nav-link">
              Categorias
            </Link>
          </li>                    
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/clientes"]} component={ClientesList} />
          <Route exact path="/add/clientes" component={AddClientes} />
          <Route path="/clientes/:id" component={Clientes} /> 

          <Route exact path={["/productos"]} component={ProductosList} />
          <Route exact path="/add/productos" component={AddProductos} />
          <Route path="/productos/:id" component={Productos} />       

          <Route exact path={["/categorias"]} component={CategoriasList} />
          <Route exact path="/add/categorias" component={AddCategorias} />
          <Route path="/categorias/:id" component={Categorias} />  

          <Route path="/">
            <h1 class="text-center">Bienvenido a Pepe System</h1>
          </Route>  
        </Switch>
      </div>
    </div>
  );
}

export default App;
