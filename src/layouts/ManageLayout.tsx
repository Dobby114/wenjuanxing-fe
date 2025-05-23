import React from 'react';
import { FC, useState } from 'react';
import { useRequest } from 'ahooks';
import { Outlet } from 'react-router-dom';
import style from './ManagerLayout.module.scss';
import { Button, Space, Modal, Form,Input,message } from 'antd';
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { postQuestion } from '../services/questions';
import useNavPage from '../hooks/useNavPage';
import useLoadingUserData from '../hooks/useLoadingUserData';
const ManageLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm()
  const [isModalOpen, setModalOpen] = useState(false)
  // 首页、注册页、登陆页面、不需要获取用户信息就可以访问！其他页面需要获取用户信息才能访问！
  const isUserDataLoaded =useLoadingUserData();
  useNavPage(isUserDataLoaded);
  const { loading, run: create } = useRequest(async (questionData)=>postQuestion(questionData), {
    manual: true,
    onSuccess(res) {
      setModalOpen(false)
      const {_id} = res
      navigate(`/question/edit/${_id}`)
    },
      onError: err => {
        message.error('出错了！');
      },
  });
  async function handleCreateQuestion(){
    try{
      const data = await form.validateFields()
      create({...data,createTime:new Date().toLocaleString()})
    }catch(err){
      console.error()
    }
  }
  return (
    <div className={style.container}>
      <div className={style.left}>
        <Button size="large" type="primary" icon={<PlusOutlined />} loading={loading} onClick={() => {
          setModalOpen(true)
        }}>
          创建问卷
        </Button>
        <Modal title="创建问卷" open={isModalOpen} onOk={handleCreateQuestion} onCancel={() => { setModalOpen(false) }}>
          <Form form={form} preserve={false} style={{width:'80%',margin:'0 auto'}}> 
            <Form.Item name='title' label='问卷标题' rules={[{required:true,message:'请输入问卷标题'}]}>
              <Input></Input>
            </Form.Item>
          </Form>
        </Modal>
        <Space direction="vertical" className={style.buttonNav} size="large">
          <Button
            type={location.pathname.startsWith('/manage/list') ? 'default' : 'text'}
            onClick={() => navigate('/manage/list')}
            icon={<UnorderedListOutlined />}
          >
            我的问卷
          </Button>
          <Button
            type={location.pathname.startsWith('/manage/star') ? 'default' : 'text'}
            onClick={() => navigate('/manage/star')}
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>
          <Button
            type={location.pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            onClick={() => navigate('/manage/trash')}
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={style.right}>
        {isUserDataLoaded && <Outlet />}
      </div>
    </div>
  );
};

export default ManageLayout;
