/**
 * @descriptor 登录页面
 * @author obf1313
 */
'use client'
import { useState } from 'react'
import { api } from '@/fetch'
import { useRouter } from 'next/navigation'
import { PageRoot } from '@/components'

const Login = () => {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  // 登录
  const login = () => {
    const params = {
      userName,
      password,
    }
    api.post('/auth/login', params).then(data => {
      console.log('data', data)
      router.push('/user')
    })
  }
  // 注册
  const register = () => {
    const params = {
      userName,
      password,
    }
    api.post('/auth/register', params).then(data => {
      console.log('data', data)
      router.push('/user')
    })
  }
  return (
    <PageRoot className="min-h-screen w-screen flex flex-col px-6 bg-gradient-to-b from-orange-100 via-orange-300 to-blue-300">
      <h1 className="mt-24 flex justify-center font-bold text-4xl">50 音</h1>
      <input
        value={userName}
        onChange={e => setUserName(e.target.value)}
        type="text"
        placeholder="用户名"
        className="h-12 mt-10 px-4 rounded-sm"
      />
      <input
        value={password}
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
