import React, { FC, useRef } from 'react';
import { Space, Button, Typography, Input, InputRef, message, Popover, QRCode } from 'antd';
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import styles from './StaticHeader.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const StaticHeader: FC = () => {
  const { Title } = Typography;
  const { title } = useGetPageInfo();
  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();
  const { id } = useParams();
  const url = `https://zaomengwenjuan-cside.vercel.app/question/${id}`;
  const inputRef = useRef<InputRef>(null);
  function handleCopy() {
    const elem = inputRef.current;
    if (elem) {
      elem.select();
      document.execCommand('copy');
      messageApi.success('复制成功');
    }
  }
  const quCodeContent = <QRCode value={url}></QRCode>;
  return (
    <div className={styles.header}>
      {contextHolder}
      <div className={styles.left}>
        <Space align="baseline">
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <Title level={4} style={{ fontWeight: 700 }}>
            {title}
          </Title>
        </Space>
      </div>
      <div className={styles.center}>
        <Space>
          <Input value={url} ref={inputRef} style={{ width: '300px' }}></Input>
          <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
          <Popover content={quCodeContent} arrow={false}>
            <Button icon={<QrcodeOutlined />}></Button>
          </Popover>
        </Space>
      </div>
      <div className={styles.right}>
        <Button
          type="primary"
          onClick={() => {
            nav(`/question/edit/${id}`);
          }}
        >
          编辑问卷
        </Button>
      </div>
    </div>
  );
};

export default StaticHeader;
