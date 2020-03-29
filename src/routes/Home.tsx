import React, { useEffect, useState } from 'react'
import wfhdog from '../assets/img/wfhdog.gif'
import { Button, Col, Form, Input, Row, Typography, Comment, Tooltip, Avatar } from 'antd'
import moment from 'moment'
import getUnixTime from '../plugins/getUnixTime'
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
  const [declarations, setDeclarations] = useState<firebase.firestore.DocumentData[]>([])
  const onFinish = async (values: any) => {
    const newDeclarations = {
      text: values.declaration,
      created: getUnixTime(),
    }
    await db.collection('declarations').add(newDeclarations)
    form.resetFields()
    const declarationsCopy = [...declarations]
    declarationsCopy.unshift(newDeclarations)
    setDeclarations(declarationsCopy)
  }
  useEffect(() => {
    const getDeclarations = async () => {
      const declarationsShot = await db
        .collection('declarations')
        .orderBy('created', 'desc')
        .get()
      const declarationsData = declarationsShot.docs.map(doc => doc.data())
      setDeclarations(declarationsData)
    }
    getDeclarations()
  }, [])
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
          {declarations.map((declaration, index) => (
            <Comment
              key={index}
              author={<a href="/">Han Solo</a>}
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
              content={<p>{declaration.text}</p>}
              datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            />
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default Home
