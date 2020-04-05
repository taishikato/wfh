import React, { useEffect, useState } from 'react'
import firebase from '../plugins/firebase'
import IsLoginContext from '../contexts/IsLoginContext'

const Auth: React.FC = props => {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user === null) {
        setIsLogin(false)
      } else {
        setIsLogin(true)
      }
    })
  }, [setIsLogin])
  return <IsLoginContext.Provider value={isLogin}>{props.children}</IsLoginContext.Provider>
}

export default Auth
