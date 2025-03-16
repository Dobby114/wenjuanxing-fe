import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { removeComponent, copySelectedComponent, pasteCopiedComponent } from '../store/components';

function isActiveElementValid() {
  const activeElement = document.activeElement;
  return activeElement === document.body ? true : false;
}
export default function useCanvasKeyPressBind() {
  const dispatch = useDispatch();
  //   删除组件
  useKeyPress(['Delete', 'Backspace'], () => {
    if (isActiveElementValid()) {
      dispatch(removeComponent());
    }
  });
  //   复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      dispatch(copySelectedComponent());
    }
  });
  //   粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      dispatch(pasteCopiedComponent());
    }
  });
}
