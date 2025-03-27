import React, { FC, useEffect } from 'react';
import { Form, Input, Checkbox, Select, Space, Button } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { questionRadioPropsType, optionsType } from './interface';
import { nanoid } from 'nanoid';

const PropComponent: FC<questionRadioPropsType> = (props: questionRadioPropsType) => {
  const { title, isVertical, options, value, onChange } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
    // console.log(options);
  }, [title, isVertical, value, options]);
  function handleFormChange() {
    // console.log(form.getFieldsValue());
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title, isVertical, value, options }}
        onFieldsChange={handleFormChange}
      >
        <Form.Item label="标题" name="title">
          <Input></Input>
        </Form.Item>
        <Form.Item label="选项">
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <Space direction="vertical" size="small">
                {fields.map(subFields => {
                  const { name, key } = subFields;
                  return (
                    <Space key={key} align="baseline" size="small">
                      <Form.Item
                        name={[name, 'label']}
                        rules={[
                          { required: true, message: '请输入选项文字' },
                          ({ getFieldsValue }) => ({
                            validator(rule, value) {
                              const { options } = getFieldsValue();
                              //   console.log(value);
                              let num = 0;
                              options.forEach((item: optionsType) => {
                                if (item.label === value) {
                                  num++;
                                }
                              });
                              return num > 1
                                ? Promise.reject(new Error('选项名重复'))
                                : Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <Input placeholder="请输入选项文字"></Input>
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
                  type="link"
                  style={{ margin: '0 auto' }}
                  onClick={() => add({ label: '', value: nanoid(5) })}
                >
                  添加选项
                </Button>
              </Space>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="默认选中" name="value">
          <Select options={options}></Select>
        </Form.Item>
        <Form.Item name="isVertical" valuePropName="checked">
          <Checkbox defaultChecked={false}>竖向排列</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};
export default PropComponent;
