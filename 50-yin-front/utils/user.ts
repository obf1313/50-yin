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
}
