import http from "../http-common";

const getAll = () => {
  return http.get("/Productos");
};

const get = (id) => {
  return http.get(`/Productos/${id}`);
};

const create = (data) => {
  return http.post("/Productos", data);
};

const update = (id, data) => {
  console.log (data)
  return http.put(`/Productos/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/Productos/${id}`);
};

const removeAll = () => {
  return http.delete(`/Productos/DeleteAll`);
};

const findByMarca = (marca) => {
  return http.get(`/Productos/marca/${marca}`);
};

const ProductosService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByMarca,
};

export default ProductosService;
