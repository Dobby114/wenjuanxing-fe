import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSingleQuestion } from '../services/questions';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { resetComponentsReducer } from '../store/components';

// 把请求的组件数据存进redux中
export function useLoadQuestionData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const { data, run, loading, error } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error('缺少问卷id');
      }
      const data = await getSingleQuestion(id);
      return data;
    },
    {
      manual: true,
    }
  );
  // 判断id变化，执行ajax加载问卷数据
  useEffect(() => {
    run(id);
  }, [id]);
  // 根据data变化，设置redux store
  useEffect(() => {
    // TODO:为什么这里没有data，就return了？
    if (!data) return;
    const { componentsList = [] } = data;
    dispatch(resetComponentsReducer({ componentsList }));
  }, [data]);
  return { loading, error };
}
