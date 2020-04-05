import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

const SignupForm: React.FC<IProps> = ({ handleMethod }) => (
  <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={handleMethod}>
    <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
    </Form.Item>
    <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
      <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
      <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" className="login-form-button">
        Login
      </Button>
    </Form.Item>
  </Form>
)

export default SignupForm

interface IProps {
  handleMethod: (values: any) => Promise<void>
}
