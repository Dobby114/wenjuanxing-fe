import { useSelector } from 'react-redux';
import { storeType } from '../store';
import { componentsStateType } from '../store/components';

export default function useGetComponentsData() {
  const componentsData: componentsStateType = useSelector(
    (state: storeType) => state.components.present
  );
  const { componentList = [], selectedId, copiedComponent } = componentsData;

  const selectedComponent = componentList.find(c => c.fe_id === selectedId);
  // const { componentList } = componentsData;
  return { componentList, selectedId, selectedComponent, copiedComponent };
}
