import React, { useState } from 'react'
import { Modal } from 'antd'

const ModalWrapper: React.FC<IProps> = ({ render }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const toggleConfirmLoading = (flg: boolean) => setConfirmLoading(flg)
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <Modal
      title="Summy of today's work"
      visible={modalVisible}
      confirmLoading={confirmLoading}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}>
      {render(toggleConfirmLoading, setModalVisible)}
    </Modal>
  )
}

export default ModalWrapper

interface IProps {
  render: (toggleConfirmLoading: (flg: boolean) => void, setModalVisible: (flg: boolean) => void) => JSX.Element
}
