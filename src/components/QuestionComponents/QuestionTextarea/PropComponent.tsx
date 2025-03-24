import React, { FC, useEffect } from 'react';
import { questionTextareaPropsType } from './interface';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

const PropComponent: FC<questionTextareaPropsType> = (props: questionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
  function handleFormValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ title, placeholder }}
        onValuesChange={handleFormValueChange}
        disabled={disabled}
      >
        <Form.Item label="标题" name="title">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="Placeholder" name="placeholder">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropComponent;
