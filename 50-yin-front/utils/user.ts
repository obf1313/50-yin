export const UserUtils = {
  token: '',
  // 设置 token
  setToken: (token: string) => {
    UserUtils.token = token
  },
  // 获取 token
  getToken: () => {
    return UserUtils.token
  },
}
