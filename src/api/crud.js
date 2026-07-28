import { http } from './http'

// Builds a standard set of CRUD calls for any /api/<resource> module.
export function createCrudApi(endpoint) {
  return {
    list: () => http.get(endpoint),
    getById: (id) => http.get(`${endpoint}/${id}`),
    create: (data) => http.post(endpoint, data),
    update: (id, data) => http.put(`${endpoint}/${id}`, data),
    remove: (id) => http.del(`${endpoint}/${id}`),
  }
}
