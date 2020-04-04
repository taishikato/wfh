import React, { useEffect, useState } from 'react'
import wfhdog from '../assets/img/wfhdog.gif'
import { Button, Col, Form, Input, Row, Typography, Comment, Tooltip, Avatar, Modal } from 'antd'
import ModalWrapper from '../components/ModalWrapper'
import FinishModalContent from '../components/FinishModalContent'
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
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const toggleConfirmLoading = (flg: boolean) => setConfirmLoading(flg)
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
      const declarationsShot = await db.collection('declarations').orderBy('created', 'desc').get()
      const declarationsData = declarationsShot.docs.map(doc => doc.data())
      setDeclarations(declarationsData)
    }
    getDeclarations()
  }, [])

  const actions = [
    <span key="comment-basic-like">
      <Button type="ghost" size="small" onClick={() => setModalVisible(true)}>
        Finish today's work?
      </Button>
      {/* <span className="comment-action">{likes}</span> */}
    </span>,
  ]

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
              actions={actions}
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
      {/* <ModalWrapper
        render={(toggleConfirmLoading: (flg: boolean) => void, setModalVisible: (flg: boolean) => void) => (
          <FinishModalContent toggleConfirmLoading={toggleConfirmLoading} setModalVisible={setModalVisible} />
        )}
      /> */}
      <Modal
        title="Summy of today's work"
        visible={modalVisible}
        confirmLoading={confirmLoading}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}>
        <FinishModalContent toggleConfirmLoading={toggleConfirmLoading} setModalVisible={setModalVisible} />
      </Modal>
    </div>
  )
}

export default Home

interface IChildProps {
  setModalVisible: (flg: boolean) => void
}
