/**
 * @descriptor 请求
 * @author obf1313
 */
import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

api.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    if (error.response.status === 500) {
      // 还得写个 toast
      console.log('服务器错误')
    }
    Promise.reject(error)
  }
)
