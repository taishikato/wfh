import React from 'react'
import { Button, Form, Input } from 'antd'
import getUnixTime from '../plugins/getUnixTime'

import firebase from '../plugins/firebase'
import 'firebase/firestore'

const db = firebase.firestore()

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const FinishModalContent: React.FC<IProps> = ({ toggleConfirmLoading, setModalVisible, postId, onFinish }) => {
  const [form] = Form.useForm()
  // const onFinish = async (values: any) => {
  //   toggleConfirmLoading(true)
  //   const newDeclarations = {
  //     text: values.declaration,
  //     created: getUnixTime(),
  //     summaryPost: true,
  //     finished: true,
  //     postId,
  //   }
  //   await db.collection('declarations').add(newDeclarations)
  //   toggleConfirmLoading(false)
  //   form.resetFields()
  //   setModalVisible(false)
  // }
  return (
    <div>
      <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
        <Form.Item name="declaration">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FinishModalContent

interface IProps {
  toggleConfirmLoading: (flg: boolean) => void
  setModalVisible: (flg: boolean) => void
  postId: string
  onFinish: (values: any) => Promise<void>
}
