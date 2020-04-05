import React from 'react'

const LoginUserContext = React.createContext<ILoginUser>({displayName: ''})

export default LoginUserContext

interface ILoginUser {
  displayName: string
}