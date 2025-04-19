import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { resetPageInfoReducer } from '../../../store/pageInfo';

const PageSetting: FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const pageInfo = useGetPageInfo();
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo,form]);
  function handleFormChange() {
    dispatch(resetPageInfoReducer(form.getFieldsValue()));
  }
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ ...pageInfo }}
        onFieldsChange={handleFormChange}
      >
        <Form.Item
          label="页面标题"
          name="title"
          rules={[{ required: true, message: '请输入页面标题' }]}
        >
          <Input placeholder="请输入页面标题..."></Input>
        </Form.Item>
        <Form.Item label="页面描述" name="desc">
          <Input.TextArea placeholder="请输入页面描述..."></Input.TextArea>
        </Form.Item>
        <Form.Item label="样式代码" name="css">
          <Input.TextArea placeholder="请输入Css代码..."></Input.TextArea>
        </Form.Item>
        <Form.Item label="脚本代码" name="js">
          <Input.TextArea placeholder="请输入Js代码..."></Input.TextArea>
        </Form.Item>
      </Form>
    </>
  );
};

export default PageSetting;
