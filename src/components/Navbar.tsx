import React, { useState, useContext } from 'react'
import { Menu, Button, Modal } from 'antd'
import LoginModalContent from './LoginModalContent'
import IsLoginContext from '../contexts/IsLoginContext'
import firebase from '../plugins/firebase'
import 'firebase/auth'

const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const logout = async () => {
    await firebase.auth().signOut()
  }
  const isLogin = useContext(IsLoginContext)
  return (
    <>
      <div>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item>WFH</Menu.Item>
          <Menu.Item>
            {isLogin ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Button type="primary" onClick={() => setModalVisible(true)}>
                Login / Sign up
              </Button>
            )}
          </Menu.Item>
        </Menu>
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
