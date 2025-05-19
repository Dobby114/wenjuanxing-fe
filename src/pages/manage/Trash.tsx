import React from 'react';
import { FC } from 'react';
import style from './Common.module.scss';
import { Button, Empty, Table, Tag, Popconfirm, message, Modal, Space, Spin } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import ListSearch from '../../components/ListSearch';
import { useLoadQuestionPageList } from '../../hooks/useLoadQuestionPageList';
import ListPage from '../../components/ListPage';
import { updateSingleQuestion, deleteQuestion } from '../../services/questions';
import { useRequest } from 'ahooks';
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const { data, loading, refresh } = useLoadQuestionPageList({ isDeleted: true });
  const questionData = data?.list || [];
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
            title="彻底删除问卷！"
            description={`是否确认彻底删除 ${record.title} ?`}
            onConfirm={() => handleDelete([record._id])}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" danger loading={deleteLoading}>
              彻底删除
            </Button>
          </Popconfirm>
        );
      },
      align: 'center',
    },
  ];

  const { loading: deleteLoading, run: handleDelete } = useRequest(
    async (idList: string[]) => {
      await deleteQuestion(idList);
    },
    {
      manual: true,
      onSuccess() {
        messageApi.success('彻底删除成功！');
        refresh();
        clearTable();
      },
      onError: err => {
        message.error('出错了！');
      },
    }
  );
  const { loading: recoverLoading, run: handleRecover } = useRequest(
    async (keys: string[]) => {
      for (const key of keys) {
        await updateSingleQuestion(key.toString(), { isDeleted: false });
      }
    },
    {
      manual: true,
      onSuccess() {
        messageApi.success('恢复成功！');
        refresh();
        clearTable();
      },
      onError: err => {
        message.error('出错了！');
      },
    }
  );
  function clearTable() {
    setSelectedRows([]);
    setSelectedRowKeys([]);
  }
  // 将复杂元素定义为一个变量
  const TableEl = (
    <div>
      <Space style={{ marginBottom: '10px' }}>
        <Button
          type="default"
          disabled={selectedRows.length ? false : true}
          loading={recoverLoading}
          onClick={() => {
            if (selectedRows.length) {
              setModalConfig({
                title: '是否确认恢复以下问卷？',
                onOk: () => {
                  handleRecover(selectedRowKeys);
                  setIsModalOpen(false);
                },
              });
              setIsModalOpen(true);
            } else {
              messageApi.error('请先选择数据！');
            }
          }}
        >
          恢复
        </Button>
        <Button
          type="primary"
          danger
          disabled={selectedRows.length ? false : true}
          loading={deleteLoading}
          onClick={() => {
            if (selectedRows.length) {
              setModalConfig({
                title: '是否确认删除以下问卷？',
                onOk: () => {
                  handleDelete(selectedRowKeys);
                  setIsModalOpen(false);
                },
              });
              setIsModalOpen(true);
            } else {
              messageApi.error('请先选择数据！');
            }
          }}
        >
          彻底删除
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={questionData}
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
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        {...modalConfig}
        okText="确定"
        cancelText="取消"
      >
        <Space>
          {selectedRows.map(item => {
            return <p key={item._id}>{item?.title}</p>;
          })}
        </Space>
      </Modal>
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
              {loading && <Spin tip="加载中">{<div style={{ padding: '50px' }}></div>}</Spin>}
            </div>
          )}
          {!loading && questionData.length > 0 && TableEl}
          {!loading && questionData.length <= 0 && <Empty description="暂无数据" />}
        </div>
        <div className={style.footer}>
          {!loading && questionData.length > 0 && <ListPage total={total} />}
        </div>
      </div>
    </div>
  );
};

export default Trash;
