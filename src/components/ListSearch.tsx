import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FC } from 'react';
import { Input } from 'antd';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
const ListSearch: FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [searchParams] = useSearchParams();
  const { Search } = Input;
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setSearchValue(newVal);
  }, [searchParams]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }
  function handleSearch(value: string) {
    // 清除时也会触发一次search！！？
    nav({
      pathname: location.pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }
  return (
    <>
      <Search
        placeholder="请输入"
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        allowClear
      />
    </>
  );
};

export default ListSearch;
