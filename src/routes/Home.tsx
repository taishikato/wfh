import React from 'react'
import wfhdog from '../assets/img/wfhdog.gif'
import { Button, Col, Form, Input, Row, Typography, Comment, Tooltip, Avatar } from 'antd'
import moment from 'moment'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons'
// import { Store } from 'antd/lib/form/Form'
import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

const { Title } = Typography
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const Home = () => {
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    console.log(values)
    await db.collection('declarations').add({
      text: values.declaration,
    })
    form.resetFields()
  }
  return (
    <div>
      <Row>
        <Col span={6} offset={6}>
          <img src={wfhdog} alt="dog" />
          <Typography>
            <Title level={3}>What are going to do today?</Title>
          </Typography>
          <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
            <Form.Item name="declaration">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Comment
            // actions={actions}
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
            content={
              <p>
                We supply a series of design principles, practical patterns and high quality design resources (Sketch
                and Axure), to help people create their product prototypes beautifully and efficiently.
              </p>
            }
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        </Col>
      </Row>
    </div>
  )
}

export default Home
