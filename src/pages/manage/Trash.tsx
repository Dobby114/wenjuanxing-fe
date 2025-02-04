import React from 'react';
import { FC } from 'react';
import style from './Common.module.scss';
import { Button, Empty, Table, Tag, Popconfirm, message, Modal, Space, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import ListSearch from '../../components/ListSearch';
import { useLoadQuestionList } from '../../hooks/useLoadQuestionList';
import ListPage from '../../components/ListPage';
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
  const { data, loading } = useLoadQuestionList({ isDelete: true });
  const mockQuestionData = data?.list || [];
  const total = data?.total || 0;
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
        disabled={selectedRows.length ? false : true}
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
        <div className={style.title}>
          <div>回收站</div>
          <div>
            <ListSearch loading={loading} />
          </div>
        </div>
        {/* 问卷列表 */}
        <div className={style.body}>
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spin />{' '}
            </div>
          )}
          {!loading && mockQuestionData.length > 0 && (
            <div>
              {TableEl}
              <div style={{ paddingTop: '20px' }}>
                {' '}
                <ListPage total={total} />
              </div>
            </div>
          )}
          {!loading && mockQuestionData.length <= 0 && <Empty description="暂无数据" />}
        </div>
      </div>
    </div>
  );
};

export default Trash;
