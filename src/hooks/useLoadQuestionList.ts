import { getQuestionList } from '../services/questions';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_KEY,
  LIST_PAGE_SIZE_DEFAULT,
} from '../constant';

type questionType = {
  isStar: boolean;
  isDelete: boolean;
};
export function useLoadQuestionList(opt: Partial<questionType> = {}) {
  const [searchParams] = useSearchParams();
  const params = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const pageNo = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_KEY) || '') || LIST_PAGE_SIZE_DEFAULT;
  // searchParams.set(LIST_PAGE_PARAM_KEY, pageNo.toString());
  // searchParams.set(LIST_PAGE_SIZE_KEY, pageSize.toString());
  const { data, loading, error } = useRequest(
    async () => {
      // setSearchParams(searchParams, { replace: true });
      const data = await getQuestionList({ ...opt, pageNo, pageSize, keywords: params });
      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );
  return { data, loading, error };
}
