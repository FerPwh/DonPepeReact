import http from "../http-common";

const getAll = () => {
  return http.get("/Categorias");
};

const get = (id) => {
  return http.get(`/Categorias/${id}`);
};

const create = (data) => {
  return http.post("/Categorias", data);
};

const update = (id, data) => {
  console.log (data)
  return http.put(`/Categorias/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/Categorias/${id}`);
};


const ClientesService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default ClientesService;
