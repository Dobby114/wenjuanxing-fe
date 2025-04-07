import React, { FC, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { LIST_PAGE_SIZE_DEFAULT, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_KEY } from '../constant/index';

type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_DEFAULT);

  // 从 url 参数中找到 page pageSize ，并且同步到 Pagination 组件中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page);
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_KEY) || '') || LIST_PAGE_SIZE_DEFAULT;
    setPageSize(pageSize);
  }, [searchParams]);

  // 当 page pageSize 改变时，跳转页面（改变 url 参数）
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_KEY, pageSize.toString());

    nav({
      pathname,
      search: searchParams.toString(), // 除了改变 page pageSize 之外，其他的 url 参数要带着
    });
  }

  return (
    <Pagination
      align="center"
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
      showSizeChanger={true}
    />
  );
};

export default ListPage;
