import React from 'react';
import { FC, useEffect } from 'react';
import { useTitle } from 'ahooks';
// import type { FormProps } from 'antd';
import { Typography, Form, Input, Button, Checkbox } from 'antd';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { PASSWORD_KEY, USERNAME_KEY } from '../constant';
import { useForm } from 'antd/es/form/Form';
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  confirmedPassword?: string;
};
const Login: FC = () => {
  useTitle('注册');
  const { Title } = Typography;
  const [form] = useForm();
  // TODO:按道理来说，用户信息不应该存储在localStorage里的，应该存储在后端数据库中！后期再做
  function rememberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }
  function forgetUser() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }
  function getUserInfo() {
    const username = localStorage.getItem(USERNAME_KEY);
    const password = localStorage.getItem(PASSWORD_KEY);
    return { username, password };
  }
  useEffect(() => {
    const { username, password } = getUserInfo();
    // console.log(username, password);
    form.setFieldsValue({ username, password });
  }, []);
  function onFinish(values: FieldType) {
    // console.log('生效');
    const { username, password, remember } = values;
    if (remember) {
      rememberUser(username as string, password as string);
    } else {
      forgetUser();
    }
  }

  function onFinishFailed(failedInfo: any) {
    console.log(failedInfo);
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>
          <Title level={3}>注册账号</Title>
        </div>
        <div className={styles.form}>
          <Form
            name="login"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item name="username" label="用户名">
              <Form.Item<FieldType>
                label="用户名"
                name="username"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { type: 'string', max: 20, message: '用户名不能大于20字' },
                  // { pattern: /^\w+$/, message: '只能是字母、数字、下划线' },
                ]}
                noStyle
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
                noStyle
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
            </Form.Item>
            <Form.Item name="confirmedPassword" label="确认密码">
              <Form.Item<FieldType>
                label="密码"
                name="confirmedPassword"
                rules={[
                  { required: true, message: '请二次输入密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value === getFieldValue('password')) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(new Error('两次密码不一致'));
                      }
                    },
                  }),
                ]}
                noStyle
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item label={null} noStyle>
              <div className={styles.submit}>
                <Button type="primary" htmlType="submit" size="large">
                  登陆
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.footer}>
          <div>
            已有账号？<Link to={LOGIN_PATHNAME}>去登陆</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
