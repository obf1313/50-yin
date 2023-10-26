import { User } from '@/entity/user'

export interface IUserVO extends Pick<User, 'id' | 'userName' | 'password' | 'createTime'> {
  lastLoginTime: string
}
