import React, { FC, useEffect } from 'react';
import { questionInfoPropsType } from './interface';
import { Form, Checkbox, Input } from 'antd';

const PropComponent: FC<questionInfoPropsType> = (props: questionInfoPropsType) => {
  const { title, desc, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  function handleFormChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  useEffect(() => {
    form.setFieldsValue({ title, desc, isCenter });
  }, [title, desc, isCenter,form]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title, desc, isCenter }}
        onFieldsChange={handleFormChange}
        disabled={disabled}
      >
        <Form.Item label="标题" name="title">
          <Input placeholder="请输入"></Input>
        </Form.Item>
        <Form.Item label="标题描述" name="desc">
          <Input.TextArea></Input.TextArea>
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox defaultChecked={true}>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
