import React, { FC, useEffect } from 'react';
import { questionTitlePropsType } from './interface';
import { Form, Input, Select, Checkbox } from 'antd';
import { useForm } from 'antd/es/form/Form';

const PropComponent: FC<questionTitlePropsType> = (props: questionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter,form]);
  function handleFormValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ text, level, isCenter }}
        onFieldsChange={handleFormValueChange}
        disabled={disabled}
      >
        <Form.Item label="标题内容" name="text">
          <Input placeholder="请输入"></Input>
        </Form.Item>
        <Form.Item label="层级" name="level">
          <Select
            options={[
              { value: 1, label: 1 },
              { value: 2, label: 2 },
              { value: 3, label: 3 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          {/* 在form中 需要使用valuePropName=“checked” 来获取子组件为checkbox 和 switch的值，否则无法获取子组件的值 */}
          <Checkbox defaultChecked={true}>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropComponent;
