export interface ILoginRequest {
  userName: string
  password: string
}

export interface ILoginResponse {
  code: number
  id: string
  token: string
}
