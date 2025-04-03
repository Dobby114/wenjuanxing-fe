import { Button, Space, Typography, Input } from 'antd';
import React, { FC, ChangeEvent, useState } from 'react';
import ToolBar from './ToolBar';
import { CheckOutlined, LeftOutlined, EditOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changePageTitleReducer } from '../../../store/pageInfo';
import { useNavigate } from 'react-router-dom';
import styles from './EditHeader.module.scss';
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks';
import { updateSingleQuestion } from '../../../services/questions';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { useParams } from 'react-router-dom';

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
const SaveButton: FC = () => {
  const { id = '' } = useParams();
  const { componentsList } = useGetComponentsData();
  const pageInfo = useGetPageInfo();
  function handleSave() {
    if (!loading) {
      save();
    }
  }
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateSingleQuestion(id, { ...pageInfo, componentsList });
    },
    { manual: true }
  );
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    handleSave();
  });
  useDebounceEffect(() => handleSave(), [componentsList, pageInfo], { wait: 2000 });
  return (
    <Button icon={<CheckOutlined />} onClick={() => handleSave()} loading={loading}>
      保存
    </Button>
  );
};
const PublishButton: FC = () => {
  const { id = '' } = useParams();
  const { run: publish, loading } = useRequest(
    async () => {
      if (!id) return;
      await updateSingleQuestion(id, { isPublished: true });
    },
    { manual: true }
  );
  return (
    <Button
      type="primary"
      loading={loading}
      onClick={() => {
        if (loading) return;
        publish();
      }}
    >
      发布
    </Button>
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
          <SaveButton />
          <PublishButton />
        </Space>
      </div>
    </div>
  );
};

export default EditHeader;
