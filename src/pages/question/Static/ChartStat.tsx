import React, { FC, useState, useEffect } from 'react';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';
import { getStaticRes } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { getComponentConfigByType } from '../../../components/QuestionComponents';

interface propsType {
  selectedComponentId: string;
  selectedComponentType: string;
}
const ChartStat: FC<propsType> = (props: propsType) => {
  const { id = '' } = useParams();
  const { Title } = Typography;
  const { selectedComponentId, selectedComponentType } = props;
  const [staticRes, setStaticRes] = useState<[]>([]);
  const { run, loading } = useRequest(async () => await getStaticRes(id, selectedComponentId), {
    onSuccess(res) {
      const { stat } = res;
      setStaticRes(stat);
    },
  });
  useEffect(() => {
    run();
  }, [id, selectedComponentId]);
  const componentConfig = getComponentConfigByType(selectedComponentType);
  const { StatComponent } = componentConfig || {};
  const genChatElem = () => {
    {
      if (StatComponent) return <StatComponent statData={staticRes} />;
      else return '该组件暂无统计数据';
    }
  };
  return (
    <>
      <Title level={3}>图表统计</Title>
      <div style={{ width: '100%', height: '100%' }}>
        {loading && <div>Loading...</div>}
        {!loading && !selectedComponentId && '暂未选择数据'}
        {!loading && selectedComponentId && genChatElem()}
      </div>
    </>
  );
};

export default ChartStat;
