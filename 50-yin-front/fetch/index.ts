/**
 * @descriptor 请求
 * @author obf1313
 */
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 3000,
})

api.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    // TODO: 仍然进了 then
    if (error.response.status === 401) {
      console.log('鉴权失败')
    }
    if (error.response.status === 500) {
      console.log('服务器错误')
    }
    Promise.reject(error)
  }
)
