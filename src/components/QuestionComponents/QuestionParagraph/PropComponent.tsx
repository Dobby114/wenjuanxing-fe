import React, { FC, useEffect } from 'react';
import { Form, Input, Checkbox } from 'antd';
import { questionParagraphPropsType } from './interface';

const QuestionParagraph: FC<questionParagraphPropsType> = (props: questionParagraphPropsType) => {
  const [form] = Form.useForm();
  const { text, isCenter, onChange, disabled } = props;
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);
  function handleFormValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <>
      <Form
        initialValues={{ text, isCenter }}
        layout="vertical"
        form={form}
        disabled={disabled}
        onFieldsChange={handleFormValueChange}
      >
        <Form.Item label="段落内容" name="text">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          {/* 在form中 需要使用valuePropName=“checked” 来获取子组件为checkbox 和 switch的值，否则无法获取子组件的值 */}
          <Checkbox defaultChecked={true}>居中显示</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default QuestionParagraph;
