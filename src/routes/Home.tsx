import React, { useEffect, useState } from 'react'
import wfhdog from '../assets/img/wfhdog.gif'
import { Button, Col, Form, Row, Comment, Tooltip, Avatar, Modal, Card } from 'antd'
import FinishModalContent from '../components/FinishModalContent'
import TaskForm from '../components/TaskForm'
import moment from 'moment'
import asyncForEach from '../plugins/asyncForEach'
import getUnixTime from '../plugins/getUnixTime'
import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

const Home = () => {
  const [form] = Form.useForm()
  const onFinish = async (values: any) => {
    const newDeclarations = {
      text: values.declaration,
      created: getUnixTime(),
      finished: false,
    }
    await db.collection('declarations').add(newDeclarations)
    form.resetFields()
    const declarationsCopy = [...declarations]
    declarationsCopy.unshift(newDeclarations)
    setDeclarations(declarationsCopy)
  }
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [postId, setPostId] = useState('')
  const toggleConfirmLoading = (flg: boolean) => setConfirmLoading(flg)
  const [declarations, setDeclarations] = useState<firebase.firestore.DocumentData[]>([])
  useEffect(() => {
    const getDeclarations = async () => {
      const declarationsShot = await db.collection('declarations').orderBy('created', 'desc').get()
      const declarationsData: any = []
      await asyncForEach(declarationsShot.docs, async doc => {
        const dec = doc.data()
        if (dec.summaryPost === true) {
          const postData = await db.collection('declarations').doc(dec.postId).get()
          declarationsData.push({ id: doc.id, originalPost: postData.data(), ...doc.data() })
        } else {
          declarationsData.push({ id: doc.id, ...doc.data() })
        }
      })
      setDeclarations(declarationsData)
    }
    getDeclarations()
  }, [])

  const handleClickButton = (id: string) => {
    setModalVisible(true)
    setPostId(id)
  }

  return (
    <div>
      <Row>
        <Col span={6} offset={6}>
          <img src={wfhdog} alt="dog" />
          <TaskForm form={form} onFinish={onFinish} />
          {declarations.map(declaration => (
            <>
              <Comment
                key={declaration.id}
                author={<a href="/">Han Solo</a>}
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
                }
                content={<p>{declaration.text}</p>}
                datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }>
                {declaration.originalPost !== undefined && <Card>{declaration.originalPost.text}</Card>}
                <span>
                  <Button type="ghost" size="small" shape="round">
                    Go Go!
                  </Button>
                </span>
                <span>
                  <Button type="ghost" size="small" shape="round">
                    You did it!!
                  </Button>
                </span>
                <div>
                  <Button type="ghost" size="small" onClick={() => handleClickButton(declaration.id)}>
                    Finish today's work?
                  </Button>
                </div>
              </Comment>
            </>
          ))}
        </Col>
      </Row>
      <Modal
        title="Summy of today's work"
        visible={modalVisible}
        confirmLoading={confirmLoading}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}>
        <FinishModalContent
          toggleConfirmLoading={toggleConfirmLoading}
          setModalVisible={setModalVisible}
          postId={postId}
        />
      </Modal>
    </div>
  )
}

export default Home
