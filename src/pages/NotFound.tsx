import React from 'react';
import { FC } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HOME_PATHNAME } from '../router';
const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在！"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate(HOME_PATHNAME);
            }}
          >
            返回首页
          </Button>
        }
      />
    </div>
  );
};
export default NotFound;
