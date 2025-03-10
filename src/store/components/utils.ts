import { componentInfoType } from './index';
export function getNextIndex(currentIndex: number, componentsList: componentInfoType[]) {
  // 判断nextId,分几种情况：1.当前列表长度为1，删除后长度为0，下一个index为‘’；2. 删除的index，是列表的最后一个元素，next= current+1;其他情况，next=current-1
  let nextIndex;
  if (componentsList.length > 1) {
    if (currentIndex === componentsList.length - 1) {
      nextIndex = currentIndex - 1;
    } else {
      nextIndex = currentIndex + 1;
    }
  }
  return String(nextIndex);
}
