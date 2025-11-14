// FILE: reactappjava/src/api/products.js
import http from "./http";

export const getProducts = (params = {}) =>
  http.get("/api/products", { params });

export const updateProduct = (id, payload) =>
  http.put(`/api/products/${id}`, payload);

export const createProduct = (payload) =>
  http.post(`/api/products`, payload);

export const deleteProduct = (id) =>
  http.delete(`/api/products/${id}`);
