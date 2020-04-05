import React, { useState, ChangeEvent } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { FormInstance } from 'antd/lib/form'

const { Title } = Typography

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const TaskForm: React.FC<IProps> = ({ form, onFinish }) => {
  const [report, setReport] = useState('')
  const [disable, setDisable] = useState(true)
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const reportVal = e.target.value
    setReport(reportVal)
    if (reportVal === '') {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }

  return (
    <>
      <Typography>
        <Title level={3}>What are going to do today?</Title>
      </Typography>
      <Form {...layout} form={form} name="nest-messages" onFinish={onFinish}>
        <Form.Item name="declaration">
          <Input.TextArea
            value={report}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleTextAreaChange(e)}
            allowClear={true}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={disable}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default TaskForm

interface IProps {
  form: FormInstance
  onFinish: (values: any) => Promise<void>
}
