import React, { useEffect, useState } from 'react'
import wfhdog from '../assets/img/wfhdog.gif'
import { Col, Form, Row } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import CommentWrapper from '../components/CommentWrapper'
import TaskForm from '../components/TaskForm'
import asyncForEach from '../plugins/asyncForEach'
import getUnixTime from '../plugins/getUnixTime'
import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

const Home = () => {
  const [form] = Form.useForm()
  const [declarations, setDeclarations] = useState<firebase.firestore.DocumentData[]>([])
  const onFinish = async (values: any) => {
    const uuid = uuidv4().split('-').join('')
    const newDeclarations: INewReport = {
      text: values.declaration,
      created: getUnixTime(),
      finished: false,
    }
    await db.collection('declarations').doc(uuid).set(newDeclarations)
    form.resetFields()
    newDeclarations.id = uuid
    const declarationsCopy = [...declarations]
    declarationsCopy.unshift(newDeclarations)
    setDeclarations(declarationsCopy)
  }

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

  return (
    <div>
      <Row>
        <Col span={6} offset={6}>
          <img src={wfhdog} alt="dog" />
          <TaskForm form={form} onFinish={onFinish} />
          {declarations.map(declaration => (
            <CommentWrapper
              declaration={declaration}
              declarations={declarations}
              setDeclarations={setDeclarations}
              db={db}
            />
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default Home

interface INewReport {
  id?: string
  text: string
  created: number
  finished: boolean
}
