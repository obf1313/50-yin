/**
 * @descriptor 请求
 * @author obf1313
 */
import axios from 'axios'
import { UserUtils } from '@/utils/user'

export const api = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 3000,
  headers: {
    // Authorization: UserUtils.getToken(),
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTQ4Njk3NzF9.PkkzkkbfLn0pXC5J1_IdWZCWez5VghQu-tDYqWp3hww',
  },
})

api.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  },
  error => {
    // TODO: 仍然进了 then
    if (error.response.status === 401) {
      console.log('鉴权失败')
      // TODO: 跳转到登录页面
    }
    if (error.response.status === 500) {
      console.log('服务器错误')
    }
    Promise.reject(error)
  }
)
