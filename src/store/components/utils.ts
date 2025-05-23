import { componentInfoType } from './index';
export function getNextSelectedId(selectedId: string, componentList: componentInfoType[]) {
  // 判断nextId,分几种情况：1.当前列表长度为1，删除后长度为0，下一个index为‘’；2. 删除的index，是列表的最后一个元素，next= current+1;其他情况，next=current-1
  // 最重要的逻辑：隐藏状态下的组件是不可以删除的！！!
  const visibleComponentList = componentList.filter(item => !item.isHidden);
  const currentIndex = visibleComponentList.findIndex(item => item.fe_id === selectedId);
  let nextSelectedId = '';
  const length = visibleComponentList.length;
  if (length > 1) {
    if (currentIndex === length - 1) {
      const nextIndex = currentIndex - 1;
      nextSelectedId = visibleComponentList[nextIndex].fe_id;
    } else if (currentIndex < length - 1) {
      const nextIndex = currentIndex + 1;
      nextSelectedId = visibleComponentList[nextIndex].fe_id;
    }
  }
  return nextSelectedId;
}

// 插入组件
export function insertComponent(
  selectedId: string,
  componentList: componentInfoType[],
  newComponent: componentInfoType
) {
  {
    const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId);
    if (selectedIndex < 0) {
      componentList.push(newComponent);
    } else {
      componentList.splice(selectedIndex + 1, 0, newComponent);
    }
  }
}
