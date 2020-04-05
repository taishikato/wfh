import React, { useEffect } from 'react'
import auth from '../plugins/auth'
import firebase from '../plugins/firebase'
import 'firebase/auth'

const Auth: React.FC = props => {
  useEffect(() => {
    const authUser = async () => {
      const user = await auth()
    }
    authUser()
  }, [])
  return <>{props.children}</>
}

export default Auth
