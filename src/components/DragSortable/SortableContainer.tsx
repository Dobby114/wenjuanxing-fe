import React, { FC } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from '@dnd-kit/core';
import {
  // arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
// import SortableItem from './SortableItem';
interface propsType {
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
  children: JSX.Element | JSX.Element[];
}
const SortableContainer: FC<propsType> = (props: propsType) => {
  const { items, onDragEnd, children } = props;
  // 区分点击和拖拽
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 10 } }));
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active?.id.toString());
      const newIndex = items.findIndex(item => item.id === over?.id.toString() || '');
      onDragEnd(oldIndex, newIndex);
      // setItems(items => {
      //   const oldIndex = items.indexOf(active?.id.toString());
      //   const newIndex = items.indexOf(over?.id.toString() || '');
      //   return arrayMove(items, oldIndex, newIndex);
      // });
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
export default SortableContainer;
