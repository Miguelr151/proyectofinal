import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
})

export const getSessions = () => api.get('/session')
export const getForumMessages = () => api.get('/forum-message')
export const getResources = () => api.get('/resource')
export const getComments = () => api.get('/comment')

export default api
