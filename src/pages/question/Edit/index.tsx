import React from 'react';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
const Edit: FC = () => {
  const { id } = useParams();
  return (
    <div>
      <div>编辑问卷</div>
      <div>edit{id}</div>
    </div>
  );
};
export default Edit;
