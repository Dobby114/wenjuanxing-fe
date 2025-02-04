import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FC } from 'react';
import { Input } from 'antd';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
interface propsType {
  loading?: boolean;
}
const ListSearch: FC<propsType> = (props: propsType) => {
  const { loading } = props;
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
        loading={loading}
      />
    </>
  );
};

export default ListSearch;
