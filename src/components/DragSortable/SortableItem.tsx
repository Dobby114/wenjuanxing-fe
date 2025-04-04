import React, { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface propsType {
  id: string;
  children: JSX.Element;
}
const SortableItem: FC<propsType> = (props: propsType) => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default SortableItem;
