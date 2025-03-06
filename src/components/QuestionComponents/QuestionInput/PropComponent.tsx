import React, { FC, useEffect } from 'react';
import { questionInputPropsType } from './interface';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

const PropComponent: FC<questionInputPropsType> = (props: questionInputPropsType) => {
  const { title, placeholder, onChange } = props;
  const [form] = useForm();
  useEffect(() => {
    // 监听输入的变化，给form动态赋值  vue中好像不用动态监听变化重新给表单赋值？
    // 这样就可以直接监测到变化的最新的数据？一整个都是响应式的？不需要用useState？
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
  // 监听组件属性表单的变化，发生变化，向父组件传递change事件，react中的change事件以属性的方式定义，定义在父组件传入的props中！
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
