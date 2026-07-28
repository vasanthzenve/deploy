import { http } from './http'

export const authApi = {
  login: (data) => http.post('/auth/login', data, { auth: false }),
  register: (data) => http.post('/auth/register', data, { auth: false }),
  status: () => http.get('/auth/status', { auth: false }),
  logout: () => http.post('/auth/logout', {}),
  listRoles: () => http.get('/roles', { auth: false }),
  createRole: (data) => http.post('/roles', data, { auth: false }),
}
