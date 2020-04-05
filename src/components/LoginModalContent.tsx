import React from 'react'
import { Tabs, notification } from 'antd'
import LoginForm from './LoginForm'
import firebase from '../plugins/firebase'
import 'firebase/auth'

const { TabPane } = Tabs

const LoginModalContent = () => {
  const onFinishLogin = async (values: any) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    } catch (err) {
      let description = 'An error occured. Please try again.'
      if (err.code === 'auth/user-not-found') {
        description = 'There is no user record corresponding to this identifier. Please sign up.'
      } else if (err.code === 'auth/wrong-password') {
        description = err.message
      }
      openNotificationWithIcon('error', 'Error', description)
    }
  }
  const onFinishSignup = async (values: any) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    } catch (err) {
      let description = 'An error occured. Please try again.'
      if (err.code === 'auth/email-already-in-use') description = err.message
      openNotificationWithIcon('error', 'Error', description)
    }
  }

  const openNotificationWithIcon = (type: string, title: string, description: string) => {
    ;(notification as any)[type]({
      message: title,
      description,
    })
  }

  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Login" key="1">
          <LoginForm handleMethod={onFinishLogin} />
        </TabPane>
        <TabPane tab="Sign up" key="2">
          <LoginForm handleMethod={onFinishSignup} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default LoginModalContent
