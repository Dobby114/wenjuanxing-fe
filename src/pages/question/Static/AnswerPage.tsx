import React, { FC, useState } from 'react';
import { useRequest } from 'ahooks';
import { getAnswerPage } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Spin, Typography, Table, Pagination } from 'antd';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { STATE_PAGE_SIZE_DEFAULT } from '../../../constant';
import styles from './AnswerPage.module.scss';

interface propsType {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
}
const AnswerPage: FC<propsType> = (props: propsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  const [pageSize, setPageSize] = useState(STATE_PAGE_SIZE_DEFAULT);
  const [pageNo, setPageOn] = useState(1);
  const { Title } = Typography;
  const { loading } = useRequest(
    async () => {
      const res = await getAnswerPage(id, { pageSize, pageNo });
      return res;
    },
    {
      onSuccess(res) {
        const { total, list } = res;
        setAnswerList(list);
        setTotal(total);
      },
      refreshDeps: [pageNo, pageSize],
    }
  );
  const { componentsList } = useGetComponentsData();
  const columns = componentsList.map(item => {
    const { fe_id, type, title, props = {} as any } = item;
    const tableTitle = props!.title || title;
    return {
      dataIndex: fe_id,
      title: (
        <div
          style={{ cursor: 'pointer', color: fe_id === selectedComponentId ? '#0958d9' : '#000' }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          {tableTitle}
        </div>
      ),
    };
  });
  const answerListWithId = answerList.map((item: any) => ({ ...item, key: item._id }));
  const TableEl = (
    <div>
      <Table
        columns={columns}
        dataSource={answerListWithId}
        pagination={false}
        size="middle"
      ></Table>
      <div style={{ paddingTop: '16px' }}>
        <Pagination
          total={total}
          align="center"
          responsive={true}
          onChange={(page, pageSize) => {
            setPageOn(page);
            setPageSize(pageSize);
          }}
          current={pageNo}
        ></Pagination>
      </div>
    </div>
  );
  return (
    <div className={styles.wrapper}>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableEl}
    </div>
  );
};

export default AnswerPage;
