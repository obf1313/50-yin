/**
 * @descriptor 登录页面
 * @author obf1313
 */
'use client'
import { useState } from 'react'
import api from '@/fetch'
import { useRouter } from 'next/navigation'
import { PageRoot } from '@/components'
import { UserUtils } from '@/utils/user'

const Login = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  // 登录
  const login = async () => {
    const params = {
      userName,
      password: await UserUtils.secret(password),
    }
    api.post('/auth/login', params).then((data: any) => {
      if (data.code === 777) {
        console.log('密码错误')
      } else {
        UserUtils.setToken(data.token)
        router.push('/user')
      }
    })
  }
  return (
    <PageRoot className="min-h-screen w-screen flex flex-col px-6 bg-gradient-to-b from-orange-100 via-orange-300 to-blue-300">
      <h1 className="mt-24 flex justify-center font-bold text-4xl">50 音</h1>
      <input
        value={userName}
        maxLength={8}
        onChange={e => setUserName(e.target.value)}
        type="text"
        placeholder="用户名"
        className="h-12 mt-10 px-4 rounded-sm"
      />
      <input
        value={password}
        maxLength={16}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="密码"
        className="h-12 mt-2 px-4 rounded-sm"
      />
      <button onClick={login} className="h-12 mt-10 bg-button text-white rounded-sm tracking-widest">
        登录/注册
      </button>
    </PageRoot>
  )
}
export default Login
