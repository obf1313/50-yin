/**
 * @descriptor 请求
 * @author obf1313
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { UserUtils } from '@/utils/user'

const tempApi = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 3000,
})

tempApi.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    if (error.response.status === 401) {
      UserUtils.toLoginPage()
      Promise.reject(error)
    }
    if (error.response.status === 500) {
      console.log('服务器错误')
      Promise.reject(error)
    }
    if (error.response.status === 777) {
      return Promise.resolve(error.response)
    }
  }
)

/**
 * 自定义 post 方法
 * 1. 添加 header: Auth
 */
const post = <Req, Res>(url: string, data?: Req, config?: AxiosRequestConfig<Req>): Promise<Res> => {
  return new Promise((resolve, reject) => {
    tempApi
      .post(url, data, {
        ...config,
        headers: {
          Authorization: UserUtils.getToken(),
        },
      })
      .then((res: AxiosResponse<any, any>) => resolve(res.data))
      .catch(e => reject(e))
  })
}

/**
 * 自定义 get 方法
 * 1. 添加 header: Auth
 */
const get = <Req, Res>(url: string, config?: AxiosRequestConfig<Req>): Promise<Res> => {
  return new Promise((resolve, reject) => {
    tempApi
      .get(url, {
        ...config,
        headers: {
          Authorization: UserUtils.getToken(),
        },
      })
      .then((res: AxiosResponse<any, any>) => resolve(res.data))
      .catch(e => reject(e))
  })
}

const api = { post, get }

export default api
