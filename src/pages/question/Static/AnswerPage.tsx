import React, { FC, useState } from 'react';
import { useRequest } from 'ahooks';
import { getAnswerPage } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Spin, Typography } from 'antd';

interface propsType {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
}
const AnswerPage: FC<propsType> = (props: propsType) => {
  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  console.log(props, answerList);
  const { Title } = Typography;
  const { loading } = useRequest(
    async () => {
      const res = await getAnswerPage(id, { pageSize: 10, pageNo: 1 });
      return res;
    },
    {
      onSuccess(res) {
        const { total, list } = res;
        setAnswerList(list);
        setTotal(total);
      },
    }
  );
  return (
    <>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
    </>
  );
};

export default AnswerPage;
