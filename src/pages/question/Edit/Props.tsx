import React, { FC } from 'react';
import useGetComponentsData from '../../../hooks/useGetComponentsData';
import { getComponentConfigByType } from '../../../components/QuestionComponents';
import { componentPropsType } from '../../../components/QuestionComponents';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../../store/components';

const NoProp: FC = () => {
  return <div>暂无数据</div>;
};
const Props: FC = () => {
  //从redux中获取目前选择的selectedId和componentList ，找到当前选中的type
  //根据type，获取当前的component，然后就可以获取到component中的PropComponent，并返回
  const dispatch = useDispatch();
  const { selectedId = '', selectedComponent } = useGetComponentsData();
  if (!selectedComponent) {
    return <NoProp />;
  }
  const { type, props, isLocked } = selectedComponent;
  const componentConfig = getComponentConfigByType(type);
  if (!componentConfig) return <NoProp />;
  const { PropComponent } = componentConfig;

  function handlePropsChange(props: componentPropsType) {
    // PropComponent 传递来的最新的form数据
    // 统一修改redux中的数据
    console.log(props);
    dispatch(changeComponentProps({ fe_id: selectedId, newProps: props }));
  }
  return <PropComponent {...props} onChange={handlePropsChange} disabled={isLocked} />;
};

export default Props;
