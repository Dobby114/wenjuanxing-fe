import React, { useState } from 'react';
import { FC } from 'react';
import style from './QuestionList.module.scss';
import { Card, Space, Tag, Button, Popconfirm, message, Modal } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { updateSingleQuestion, duplicateQuestion } from '../services/questions';
import { useRequest } from 'ahooks';

interface propsType {
  _id: number; //用_id的原因是，符合mongoDB的返回规范
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createTime: string;
  reload?:()=>void
}
const QuestionList: FC<propsType> = (props: propsType) => {
  const navigate = useNavigate();
  const [modal, deleteModalContextHolder] = Modal.useModal();
  const { _id, title, isPublished, isStar, answerCount, createTime,reload } = props;
  const [isStarred, setIsStarred] = useState(isStar);
  const { loading: starChangeLoading, run: handleQuestionChange } = useRequest(
    async data => {
      await updateSingleQuestion(_id.toString(), { ...data });
    },
    {
      manual: true,
      onSuccess: () => {
        // setIsStarred(!isStarred);
        // messageApi.success('更新成功！');
        if(reload){
          reload()
         }
      },
      onError: err => {
        message.error('出错了！');
      },
    }
  );
  const { loading: duplicateLoading, run: handleDuplicate } = useRequest(
    async () => {
      const result = await duplicateQuestion(_id.toString());
      return result;
    },
    {
      manual: true,
      onSuccess: res => {
        if (res?._id) {
          message.success('复制成功！');
          navigate(`/question/edit/${res._id}`);
        }
      },
      onError: err => {
        message.error('出错了！');
      },
    }
  );
  const deleteButtonConfig = {
    title: '删除问卷',
    content: <div>确认删除问卷 {title} 吗？</div>,
    okText: '确定',
    cancelText: '取消',
    onOk:  () => {
       handleQuestionChange({ isDeleted: true });
       message.success('删除成功！')
    },
  };
  function handleDelete() {
    modal.confirm(deleteButtonConfig);
  }
  return (
    <Card
      className={style.card}
      title={title}
      extra={
        <Space>
          <Tag color={isPublished ? 'processing' : 'default'}>
            {isPublished ? '已发布' : '未发布'}
          </Tag>
          {/* <span>答案: {answerCount}</span> */}
          <span>{createTime && createTime.split(' ')[0]}</span>
        </Space>
      }
    >
      {deleteModalContextHolder}
      <div className={style.content}>
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(`/question/edit/${_id}`)}
          >
            编辑问卷
          </Button>
          <Button
            type="text"
            icon={<LineChartOutlined />}
            disabled={!isPublished}
            onClick={() => navigate(`/question/static/${_id}`)}
          >
            数据统计
          </Button>
        </Space>
        <Space size="small">
          <Button
            type="text"
            icon={
              isStarred ? <StarFilled style={{ color: isStarred && 'yellow' }} /> : <StarOutlined />
            }
            onClick={() => {
              handleQuestionChange({ isStar: !isStarred });
              setIsStarred(!isStarred);
            }}
            loading={starChangeLoading}
          >
            {isStarred ? '取消标星' : '标星'}
          </Button>
          <Popconfirm
            title="复制问卷"
            description={`确定复制问卷 ${title} 吗? `}
            okText="确定"
            cancelText="取消"
            onConfirm={handleDuplicate}
          >
            <Button type="text" icon={<DeleteOutlined />} loading={duplicateLoading}>
              复制
            </Button>
          </Popconfirm>
          <Button type="text" icon={<CopyOutlined />} onClick={handleDelete}>
            删除
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default QuestionList;
