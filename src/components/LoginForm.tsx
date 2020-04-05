import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

const LoginForm: React.FC<IProps> = ({ handleMethod, loading }) => {
  return (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={handleMethod}>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm

interface IProps {
  handleMethod: (values: any) => Promise<void>
  loading: boolean
}
