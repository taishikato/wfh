import React from 'react'
import { Menu, Button } from 'antd'

const Navbar = () => {
  return (
    <div>
      <div className="logo" />
      <Menu mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">WFH</Menu.Item>
        <Button type="primary">Login</Button>
      </Menu>
    </div>
  )
}

export default Navbar
