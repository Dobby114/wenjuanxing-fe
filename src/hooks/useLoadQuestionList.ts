import { getQuestionList } from '../services/questions';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';

type questionType = {
  isStar: boolean;
  isDelete: boolean;
};
export function useLoadQuestionList(opt: Partial<questionType> = {}) {
  const [searchParams] = useSearchParams();
  const params = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const { data, loading, error } = useRequest(
    async () => {
      const data = await getQuestionList({ ...opt, keywords: params });
      return data;
    },
    {
      refreshDeps: [params],
    }
  );
  return { data, loading, error };
}
