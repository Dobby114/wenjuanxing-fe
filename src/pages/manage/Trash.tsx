import React from 'react';
import { FC } from 'react';
import style from './Common.module.scss';
import { Button, Empty, Table, Tag, Popconfirm, message, Modal, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
interface questionDataType {
  _id: number;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createTime: string;
}
const Trash: FC = () => {
  const [selectedRows, setSelectedRows] = useState<questionDataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
          <Popconfirm
            title="删除问卷"
            description={`是否确认删除${record.title}?`}
            onConfirm={() => handleDelete([record._id])}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" danger>
              删除
            </Button>
          </Popconfirm>
        );
      },
      align: 'center',
    },
  ];
  function handleDelete(keys: number[]) {
    console.log(keys);
    messageApi.success('删除成功');
  }
  // 将复杂元素定义为一个变量
  const TableEl = (
    <div>
      <Button
        type="primary"
        danger
        onClick={() => {
          if (selectedRows.length) {
            setIsModalOpen(true);
          } else {
            messageApi.error('请先选择数据！');
          }
        }}
      >
        批量删除
      </Button>
      <Table
        columns={columns}
        dataSource={mockQuestionData}
        bordered={true}
        rowKey={record => record._id}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows as []);
            setSelectedRowKeys(selectedRowKeys as []);
          },
        }}
      ></Table>
    </div>
  );
  return (
    <div className={style.container}>
      {contextHolder}
      <Modal
        title="是否确认删除以下问卷？"
        open={isModalOpen}
        onOk={() => {
          const selectedKeys = selectedRows.map(item => item._id);
          handleDelete(selectedKeys);
          setIsModalOpen(false);
          setSelectedRows([]);
          setSelectedRowKeys([]);
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space>
          {selectedRows.map(item => {
            return <p key={item._id}>{item?.title}</p>;
          })}
        </Space>
      </Modal>
      {/* <div className={style.header}>星星问卷</div> */}
      <div className={style.content}>
        <div className={style.title}>回收站</div>
        {mockQuestionData.length > 0 ? TableEl : <Empty description="暂无数据" />}
      </div>
      <div className={style.footer}>loader more... 上滑加载更多...</div>
    </div>
  );
};

export default Trash;
