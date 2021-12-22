import http from "../http-common";

const getAll = () => {
  return http.get("/Clientes");
};

const get = (id) => {
  return http.get(`/Clientes/${id}`);
};

const create = (data) => {
  return http.post("/Clientes", data);
};

const update = (id, data) => {
  console.log (data)
  return http.put(`/Clientes/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/Clientes/${id}`);
};


const ClientesService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default ClientesService;
