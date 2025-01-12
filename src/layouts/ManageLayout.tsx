import React from 'react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import style from './ManagerLayout.module.scss';
import { Button, Space } from 'antd';
import {
  PlusOutlined,
  UnorderedListOutlined,
  StarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
const ManageLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  return (
    <div className={style.container}>
      <div className={style.left}>
        <Button size="large" type="primary" icon={<PlusOutlined />}>
          创建问卷
        </Button>
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
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
