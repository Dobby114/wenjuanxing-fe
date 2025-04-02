import { Button, Space, Typography, Input } from 'antd';
import React, { FC, ChangeEvent, useState } from 'react';
import ToolBar from './ToolBar';
import { CheckOutlined, LeftOutlined, EditOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changePageTitleReducer } from '../../../store/pageInfo';
import { useNavigate } from 'react-router-dom';
import styles from './EditHeader.module.scss';
const TitleItem: FC = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [isEdit, setIsEdit] = useState(false);
  const { title } = useGetPageInfo();
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(changePageTitleReducer(e.target.value));
  }
  if (isEdit) {
    return (
      <Input
        defaultValue={title}
        onChange={handleTitleChange}
        onPressEnter={() => setIsEdit(false)}
        onBlur={() => setIsEdit(false)}
      ></Input>
    );
  }
  return (
    <>
      <Space align="baseline">
        <Title className={styles.questionTitle}>{title}</Title>
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => {
            setIsEdit(true);
          }}
        ></Button>
      </Space>
    </>
  );
};
const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.header}>
      <div>
        <Space align="center">
          <Button
            type="link"
            onClick={() => {
              nav(-1);
            }}
            icon={<LeftOutlined />}
          >
            返回
          </Button>
          <TitleItem />
        </Space>
      </div>
      <div>
        <ToolBar />
      </div>
      <div>
        <Space>
          <Button icon={<CheckOutlined />}>保存</Button>
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  );
};

export default EditHeader;
