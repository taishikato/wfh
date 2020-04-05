import React, { useState } from 'react'
import { Tabs, notification } from 'antd'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import getUnixTime from '../plugins/getUnixTime'
import firebase from '../plugins/firebase'
import 'firebase/auth'
import 'firebase/firestore'

const db = firebase.firestore()

const { TabPane } = Tabs

const LoginModalContent: React.FC<IProps> = ({ setModalVisible }) => {
  const [loading, setLoading] = useState(false)
  const onFinishLogin = async (values: any) => {
    try {
      setLoading(true)
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    } catch (err) {
      let description = 'An error occured. Please try again.'
      if (err.code === 'auth/user-not-found') {
        description = 'There is no user record corresponding to this identifier. Please sign up.'
      } else if (err.code === 'auth/wrong-password') {
        description = err.message
      }
      openNotificationWithIcon('error', 'Error', description)
    } finally {
      setLoading(false)
      setModalVisible(false)
    }
  }
  const onFinishSignup = async (values: any) => {
    try {
      setLoading(true)
      const result = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      const user = result.user
      await db.collection('users').doc(user!.uid).set({
        displayName: values.username,
        created: getUnixTime(),
      })
    } catch (err) {
      let description = 'An error occured. Please try again.'
      if (err.code === 'auth/email-already-in-use') description = err.message
      openNotificationWithIcon('error', 'Error', description)
    } finally {
      setLoading(false)
      setModalVisible(false)
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
          <LoginForm handleMethod={onFinishLogin} loading={loading} />
        </TabPane>
        <TabPane tab="Sign up" key="2">
          <SignupForm handleMethod={onFinishSignup} loading={loading} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default LoginModalContent

interface IProps {
  setModalVisible: (flg: boolean) => void
}
