import { useSelector } from 'react-redux';
import { storeType } from '../store';
import { componentsStateType } from '../store/components';

export default function useGetComponentsData() {
  const componentsData: componentsStateType = useSelector((state: storeType) => state.components);
  const { componentsList = [], selectedId } = componentsData;

  const selectedComponent = componentsList.find(c => c.fe_id === selectedId);
  // const { componentsList } = componentsData;
  return { componentsList, selectedId, selectedComponent };
}
