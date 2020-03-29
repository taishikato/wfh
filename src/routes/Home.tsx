import React from 'react'
import wfhdog from '../assets/img/wfhdog.gif'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
// import { Store } from 'antd/lib/form/Form'
const { Title } = Typography

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const Home = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }
  return (
    <div>
      <Row>
        <img src={wfhdog} alt="dog" />
        <Col span={6} offset={6}>
          <Typography>
            <Title level={3}>What are going to do today?</Title>
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
              <Form.Item name={['user', 'introduction']}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Typography>
        </Col>
      </Row>
    </div>
  )
}

export default Home
