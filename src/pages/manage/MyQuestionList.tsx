import React, { useState, useEffect, useRef } from 'react';
import { FC } from 'react';
import QuestionList from '../../components/QuestionList';
import style from './Common.module.scss';
import { Empty, Spin } from 'antd';
import ListSearch from '../../components/ListSearch';
import { getQuestionList } from '../../services/questions';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY, LIST_PAGE_SIZE_DEFAULT } from '../../constant';
const MyQuestionList: FC = () => {
  // 下拉加载更多，不用改变url，
  // 1. 同样采用通过pageNo来加载的方式，每次加载pageNo+1
  // 2. 当滑动到窗口底部，触发加载
  // 2. 用一个列表，存储已经加载的数据，当list.length>=total,时表示数据加载完毕
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const questionData = useRef([]);
  // const [loadable, setLoadable] = useState(false);
  const [total, setTotal] = useState(0);
  const pageNo = useRef(1);
  const loadable = questionData.current.length < total;
  const loadPromptRef = useRef(null);
  const { loading, run: loadPage } = useRequest(
    async () => {
      const res: any = await getQuestionList({
        pageNo: pageNo.current,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
        keyword: keyword,
      });
      // setTotal(res.total || 0);
      return res;
    },
    {
      manual: true,
      onSuccess: res => {
        const { list = [], total = 0 } = res;
        setTotal(total);
        questionData.current = questionData.current.concat(list);
        pageNo.current++;
        // 因为不能立刻拿到questionData的真实长度，所以这里不能直接比较
      },
    }
  );
  function handleTryLoad(entries: any) {
    if (entries[0]?.isIntersecting && loadable) {
      loadPage();
    }
  }
  // console.log(questionData)
  // // 触底交叉加载
  const observer = new IntersectionObserver(handleTryLoad);
  // 初始化加载
  function initData(){
    questionData.current = [];
    pageNo.current = 1;
  }
  useEffect(() => {
    initData()
    loadPage();
  }, [keyword]);

  useEffect(() => {
    if (loadPromptRef.current) {
      observer.observe(loadPromptRef.current);
    }
    return () => {
      if (loadPromptRef.current) {
        observer.unobserve(loadPromptRef.current);
      }
    };
  }, [pageNo.current]); // 空数组表示只在挂载和卸载时运行

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <div>我的问卷</div>
          <div>
            <ListSearch loading={loading} />
          </div>
        </div>
        {/* 问卷列表 loading有问题 */}
        <div className={style.body}>
          {loading && (
            <div className={style.loading}>
              <Spin />
            </div>
          )}
          {questionData.current.length > 0 && (
            <div>
              {questionData.current.map((item: any) => {
                return <QuestionList key={item._id} {...item} reload={()=>{
                  initData()
                  loadPage()
                }}></QuestionList>;
              })}
              <div ref={loadPromptRef} className={style.footer}>
                {loadable ? 'loader more... 上滑加载更多...' : '没有更多了...'}
              </div>
            </div>
          )}
          {!loading && questionData.current.length <= 0 && <Empty description="暂无数据" />}
        </div>
      </div>
    </div>
  );
};

export default MyQuestionList;
