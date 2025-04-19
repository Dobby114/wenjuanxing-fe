import React, { FC, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { questionCheckboxPropsType, optionsType } from './interface';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

const PropComponent: FC<questionCheckboxPropsType> = (props: questionCheckboxPropsType) => {
  const [form] = Form.useForm();
  const { title, options, isVertical, onChange, disabled } = props;

  function handleFormChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  useEffect(() => {
    form.setFieldsValue({ title, options, isVertical });
  }, [title, options, isVertical,form]);
  return (
    <>
      <Form
        form={form}
        initialValues={{ title, options, isVertical }}
        layout="vertical"
        onFieldsChange={handleFormChange}
        disabled={disabled}
      >
        <Form.Item name="title" label="标题">
          <Input placeholder="请输入多选标题" />
        </Form.Item>
        <Form.Item label="选项">
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <Space direction="vertical">
                {fields.map(subFields => {
                  const { key, name } = subFields;
                  return (
                    <Space key={key} align="baseline">
                      <Form.Item name={[name, 'checked']} valuePropName="checked">
                        <Checkbox></Checkbox>
                      </Form.Item>
                      <Form.Item
                        name={[name, 'label']}
                        rules={[
                          { required: true, message: '请输入选项名' },
                          ({ getFieldsValue }) => ({
                            validator(_, value) {
                              const { options } = getFieldsValue();
                              //   console.log(value);
                              let num = 0;
                              options.forEach((item: optionsType) => {
                                if (item.label === value) {
                                  num++;
                                }
                              });
                              return num > 1 && value
                                ? Promise.reject(new Error('选项名重复'))
                                : Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Input placeholder="请输入" />
                      </Form.Item>
                      {key > 1 && (
                        <Button
                          icon={<MinusCircleOutlined />}
                          type="text"
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      )}
                    </Space>
                  );
                })}
                <Button
                  icon={<PlusOutlined />}
                  style={{ width: '100%', textAlign: 'center' }}
                  type="link"
                  onClick={() => {
                    add({ label: '', value: nanoid(5) });
                  }}
                >
                  添加选项
                </Button>
              </Space>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item name="isVertical" valuePropName="checked">
          <Checkbox>竖向排列</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
