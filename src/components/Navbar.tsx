import React, { useState, useContext } from 'react'
import { Menu, Button, Modal } from 'antd'
import LoginModalContent from './LoginModalContent'
import IsLoginContext from '../contexts/IsLoginContext'
import LoginUserContext from '../contexts/LoginUserContext'
import firebase from '../plugins/firebase'
import 'firebase/auth'

const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const logout = async () => {
    await firebase.auth().signOut()
  }
  const isLogin = useContext(IsLoginContext)
  const loginUser = useContext(LoginUserContext)
  return (
    <>
      <div>
        {/* <div className="logo" /> */}
        <Menu mode="horizontal">
          <Menu.Item key="title">WFH</Menu.Item>
          <Menu.Item key="login-logout" style={{ float: 'right' }}>
            {isLogin ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button type="primary" onClick={() => setModalVisible(true)}>
                Login / Sign up
              </Button>
            )}
          </Menu.Item>
        </Menu>
        {loginUser.displayName}
      </div>
      <Modal
        footer={null}
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}>
        <LoginModalContent setModalVisible={setModalVisible} />
      </Modal>
    </>
  )
}

export default Navbar
