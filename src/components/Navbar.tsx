import React, { useState } from 'react'
import { Menu, Button, Modal } from 'antd'
import LoginModalContent from './LoginModalContent'

const Navbar = () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <div>
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item>WFH</Menu.Item>
          <Menu.Item>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Login / Sign up
            </Button>
          </Menu.Item>
        </Menu>
      </div>
      <Modal
        // title="Login / Sign up"
        footer={null}
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}>
        <LoginModalContent />
      </Modal>
    </>
  )
}

export default Navbar
