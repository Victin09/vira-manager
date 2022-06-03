import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContextProps } from '@vira/common/types/auth-provider.type'
import { User } from '@vira/models/user.model'
import { SignIn, SignUp } from '@vira/models/auth.model'
import { Response } from '@vira/common/types/fetch.type'
import { getApiUrl } from '@vira/common/utils/api.util'

const defaultState: AuthContextProps = {
  error: '',
  getUser: (): User | null => null,
  signin: async (): Promise<void> => {},
  signup: async (): Promise<void> => {}
}

const AuthContext = createContext<AuthContextProps>(defaultState)

export const AuthProvider = ({ children }: any) => {
  const auth = useProviderAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const useProviderAuth = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  const getUser = (): User | null => {
    if (user) {
      return user
    }
    const userString = localStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(atob(userString))
      return user
    }
    return null
    // return {
    //   id: '1dc93e11-99a5-4177-8d2e-400576b2029f',
    //   fullname: 'VIRA',
    //   email: 'vira@vira.es',
    //   avatar: ''
    // }
    // navigate('/signin')
  }

  const signin = async (data: SignIn): Promise<void> => {
    const result: Response<User> = await (
      await fetch(`${getApiUrl()}/auth/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
        credentials: 'include'
      })
    ).json()
    if (result.status === 200) {
      setUser(result.data!)
      localStorage.setItem('user', btoa(JSON.stringify(result.data)))
      navigate('/')
    } else {
      setError(
        result.message === 'Invalid credentials'
          ? 'Email or password is incorrect'
          : 'Something went wrong'
      )
    }
  }

  const signup = async (data: SignUp) => {
    try {
      const result: Response<User> = await (
        await fetch(`${getApiUrl()}/auth/sign-up`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            fullname: data.fullname,
            password: data.password,
            avatar: data.avatar
          }),
          credentials: 'include'
        })
      ).json()
      console.log('result', result)
      if (result.status === 400 && result.message === 'User already exists') {
        setError('User already exists')
        return
      }
      setUser(result.data!)
      navigate('/')
    } catch (error) {
      setError('Something went wrong')
    }
  }

  return {
    error,
    getUser,
    signin,
    signup
  }
}
