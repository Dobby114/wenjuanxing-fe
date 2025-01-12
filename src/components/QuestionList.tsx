import React from 'react';
import { FC } from 'react';
import style from './QuestionList.module.scss';
import { Card, Space, Tag, Button, Popconfirm } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  LineChartOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface propsType {
  _id: number; //用_id的原因是，符合mongoDB的返回规范
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createTime: string;
}
const QuestionList: FC<propsType> = (props: propsType) => {
  const navigate = useNavigate();
  const { _id, title, isPublished, isStar, answerCount, createTime } = props;
  return (
    <Card
      className={style.card}
      title={title}
      extra={
        <Space>
          <Tag color={isPublished ? 'processing' : 'default'}>
            {isPublished ? '已发布' : '未发布'}
          </Tag>
          <span>答案: {answerCount}</span>
          <span>{createTime}</span>
        </Space>
      }
    >
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
            icon={isStar ? <StarFilled style={{ color: 'yellow' }} /> : <StarOutlined />}
          >
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Button type="text" icon={<CopyOutlined />}>
            复制
          </Button>
          <Popconfirm title="删除问卷" description={`确定删除问卷${_id}吗? `}>
            <Button type="text" icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      </div>
    </Card>
  );
};

export default QuestionList;
