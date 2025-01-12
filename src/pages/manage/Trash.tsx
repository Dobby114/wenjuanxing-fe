/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FC } from 'react';
import style from './Common.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Button, Empty, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
const mockQuestionData = [
  {
    _id: 0,
    title: '问卷一',
    isPublished: false,
    isStar: false,
    answerCount: 8,
    createTime: '12月22日 16:28',
  },
  {
    _id: 1,
    title: '问卷二',
    isPublished: true,
    isStar: false,
    answerCount: 8,
    createTime: '12月21日 16:28',
  },
  {
    _id: 2,
    title: '问卷三',
    isPublished: false,
    isStar: true,
    answerCount: 8,
    createTime: '12月20日 16:28',
  },
];
// 不设置ts类型的话，配置属性会报错！！！
const columns: ColumnsType = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    key: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>;
    },
    align: 'center',
  },
  {
    title: '答卷',
    dataIndex: 'answerCount',
    key: 'answerCount',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => {
      return (
        <Button size="small" type="primary" onClick={() => handleDelete(record)}>
          删除
        </Button>
      );
    },
    align: 'center',
  },
];
function handleDelete(data: any) {
  console.log(data);
}
const MyQuestionList: FC = () => {
  const [searchParams] = useSearchParams();
  console.log('搜索参数', searchParams.get('keywords'));
  return (
    <div className={style.container}>
      {/* <div className={style.header}>星星问卷</div> */}
      <div className={style.content}>
        <div className={style.title}>回收站</div>
        {mockQuestionData.length > 0 ? (
          <Table
            columns={columns}
            dataSource={mockQuestionData}
            bordered={true}
            rowKey={record => record._id}
            pagination={false}
          ></Table>
        ) : (
          <Empty description="暂无数据" />
        )}
      </div>
      <div className={style.footer}>loader more... 上滑加载更多...</div>
    </div>
  );
};

export default MyQuestionList;
