import { useSelector } from 'react-redux';
import { storeType } from '../store';
import { componentsStateType } from '../store/components';

export default function useGetComponentsData() {
  const componentsData: componentsStateType = useSelector((state: storeType) => state.components);
  // const { componentsList } = componentsData;
  return componentsData;
}
