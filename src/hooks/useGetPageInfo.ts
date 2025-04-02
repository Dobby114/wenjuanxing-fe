import { useSelector } from 'react-redux';
import { storeType } from '../store';
import { pageInfoType } from '../store/pageInfo';

export default function useGetPageInfo() {
  const pageInfo: pageInfoType = useSelector((state: storeType) => state.pageInfo);
  return pageInfo;
}
