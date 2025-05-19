import React from 'react';
import { FC, useEffect } from 'react';
import { useTitle, useRequest } from 'ahooks';
// import type { FormProps } from 'antd';
import { Typography, Form, Input, Button, Checkbox, message } from 'antd';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_PATHNAME, MANAGER_INDEX_PATHNAME } from '../router';
import { PASSWORD_KEY, USERNAME_KEY } from '../constant';
import { useForm } from 'antd/es/form/Form';
import { userLogin } from '../services/user';
import { setUserToken } from '../utils/user-tokens';
type FieldType = {
  username: string;
  password: string;
  remember?: string;
};
const Login: FC = () => {
  useTitle('登陆');
  const nav = useNavigate();
  const { Title } = Typography;
  const [form] = useForm();
  function rememberUser(username: string, password: string) {
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(PASSWORD_KEY, password);
  }
  function forgetUser() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(PASSWORD_KEY);
  }
  function getRememberInfo() {
    const username = localStorage.getItem(USERNAME_KEY);
    const password = localStorage.getItem(PASSWORD_KEY);
    return { username, password };
  }
  useEffect(() => {
    const { username, password } = getRememberInfo();
    // console.log(username, password);
    form.setFieldsValue({ username, password });
  }, [form]);
  const { loading: loginLoading, run: handleLogin } = useRequest(
    async (data: FieldType) => {
      const result = await userLogin(data);
      return result;
    },
    {
      manual: true,
      onSuccess: res => {
        message.success('登陆成功！');
        setUserToken(res.token || '');
        nav(MANAGER_INDEX_PATHNAME);
      },
      onError: err => {
        message.error('出错了！');
      },
    }
  );
  function onFinish(values: FieldType) {
    const { username, password, remember } = values;
    if (remember) {
      rememberUser(username as string, password as string);
    } else {
      forgetUser();
    }
    handleLogin(values);
  }

  function onFinishFailed(failedInfo: any) {
    console.log(failedInfo);
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>
          <Title level={3}>欢迎使用 造梦问卷</Title>
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

            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item label={null} noStyle>
              <div className={styles.submit}>
                <Button type="primary" htmlType="submit" size="large" loading={loginLoading}>
                  登陆
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.footer}>
          <div>
            还没有账号？<Link to={REGISTER_PATHNAME}>注册</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
