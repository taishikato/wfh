import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import firebase from '../plugins/firebase'

const LoginModalContent = () => {
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values)
    await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
  }

  return (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Email!' }]}>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="/">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <a href="/">Or register now!</a>
      </Form.Item>
    </Form>
  )
}

export default LoginModalContent
