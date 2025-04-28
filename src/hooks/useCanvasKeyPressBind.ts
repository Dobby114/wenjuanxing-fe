import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import {
  removeComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  changeSelectedId,
} from '../store/components';
import useGetComponentsData from './useGetComponentsData';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

function isActiveElementValid() {
  const activeElement = document.activeElement;
  if (activeElement === document.body) return true;
  if (activeElement?.matches('div[role="button"]')) return true; // 兼容dnd-kit所带来的影响
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
  //   选中上一个
  const { componentList, selectedId } = useGetComponentsData();
  const selectedComponentIndex = componentList.findIndex(item => item.fe_id === selectedId);
  useKeyPress('uparrow', () => {
    if (isActiveElementValid()) {
      if (selectedComponentIndex < 0) return;
      if (selectedComponentIndex === 0) return;
      const nextComponent = componentList[selectedComponentIndex - 1];
      dispatch(changeSelectedId({ selectedId: nextComponent.fe_id }));
    }
  });
  //   选中下一个
  useKeyPress('downarrow', () => {
    if (isActiveElementValid()) {
      if (selectedComponentIndex < 0) return;
      if (selectedComponentIndex === componentList.length - 1) return;
      const nextComponent = componentList[selectedComponentIndex + 1];
      dispatch(changeSelectedId({ selectedId: nextComponent.fe_id }));
    }
  });
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      dispatch(UndoActionCreators.undo());
    },
    { exactMatch: true }
  );
  // 重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      dispatch(UndoActionCreators.redo());
    },
    { exactMatch: true }
  );
}
