import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSingleQuestion } from '../services/questions';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';
import { resetComponentsReducer } from '../store/components';
import { resetPageInfoReducer } from '../store/pageInfo';

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
  // 判断id变化，执行ajax加载问卷数据，这对吗？编辑完成后，重新加载，id没变，但是data是变了的
  useEffect(() => {
    run(id);
  }, [id,run]);
  // 根据data变化，设置redux store
  useEffect(() => {
    // TODO:为什么这里没有data，就return了？
    if (!data) return;
    // 不是在stor中写了初始的默认值吗？为啥这里还要写？
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      componentList = [],
      isPublished = false,
    } = data;
    // 设置默认选择的组件为列表中的第一个
    let selectedId = '';
    if (componentList.length) {
      selectedId = componentList[0].fe_id;
    }
    // 在这里将后台返回的所有组件信息数据全部都存到redux中去了
    dispatch(resetComponentsReducer({ componentList, selectedId, copiedComponent: null }));
    // 将pageInfo存储到redux中的stor中去
    dispatch(resetPageInfoReducer({ title, desc, js, css, isPublished }));
  }, [data]);
  return { loading, error };
}
