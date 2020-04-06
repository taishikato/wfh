import React, { useState } from 'react'
import { Button, Comment, Tooltip, Avatar, Card, Modal } from 'antd'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import FinishModalContent from './FinishModalContent'
import getUnixTime from '../plugins/getUnixTime'

const CommentWrapper: React.FC<IProps> = ({ declaration, declarations, setDeclarations, db }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [postId, setPostId] = useState('')
  const toggleConfirmLoading = (flg: boolean) => setConfirmLoading(flg)
  const handleClickButton = (id: string) => {
    setModalVisible(true)
    setPostId(id)
  }
  const onFinishSummary = async (values: any) => {
    const uuid = uuidv4().split('-').join('')
    toggleConfirmLoading(true)
    const newDeclarations = {
      text: values.declaration,
      created: getUnixTime(),
      summaryPost: true,
      finished: true,
      postId,
    }
    await db.collection('declarations').doc(uuid).set(newDeclarations)
    const declarationsCopy = [...declarations]
    declarationsCopy.unshift(newDeclarations)
    setDeclarations(declarationsCopy)
    toggleConfirmLoading(false)
    // form.resetFields()
    setModalVisible(false)
  }
  return (
    <>
      <Comment
        key={declaration.id}
        author={<a href="/">Han Solo</a>}
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
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
          onFinish={onFinishSummary}
        />
      </Modal>
    </>
  )
}

export default CommentWrapper

interface IProps {
  declaration: any
  declarations: any
  setDeclarations: any
  db: firebase.firestore.Firestore
}
