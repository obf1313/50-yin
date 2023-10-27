import api from '@/fetch'
import { ILoginRequest, ILoginResponse } from './interface'

/** 登录 */
export const login = async (params: ILoginRequest) => {
  return api.post<ILoginRequest, ILoginResponse>('/auth/login', params)
}
