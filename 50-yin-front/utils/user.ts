'use client'

export const UserUtils = {
  // 跳转至登录页
  toLoginPage: () => {
    window.location.href = '/login'
  },
  // 设置 token
  setToken: (token: string) => {
    sessionStorage.setItem('token', token)
  },
  // 获取 token
  getToken: () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      return 'Bearer ' + sessionStorage.getItem('token')
    } else {
      UserUtils.toLoginPage()
    }
  },
  // 加密
  secret: async (str: string) => {
    const JSEncrypt = (await import('jsencrypt')).default
    const encryptor = new JSEncrypt()
    const pubKey =
      '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQAB-----END PUBLIC KEY-----'
    encryptor.setPublicKey(pubKey)
    const returnStrt = encryptor.encrypt(str)
    return returnStrt
  },
}
