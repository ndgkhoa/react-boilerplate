import type { ChangeEvent } from 'react';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import type { PaginationProps } from 'antd';

interface SearchStateConfig {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  keywordDebounceTime?: number;
}

interface SearchStateValues {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
}

const defaultConfig: SearchStateConfig = {
  keyword: '',
  pageIndex: 1,
  pageSize: 10,
  keywordDebounceTime: 500,
};

export const useSearchState = (config: SearchStateConfig = defaultConfig) => {
  const { keyword, pageIndex, pageSize, keywordDebounceTime } = config;

  const [pageIndexState, setPageIndexState] = useState(pageIndex);
  const [pageSizeState, setPageSizeState] = useState(pageSize);
  const [keywordState, setKeywordState] = useState(keyword);

  const onKeywordChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setKeywordState(e.target.value);
    setPageIndexState(1);
  }, keywordDebounceTime);

  const onPaginationChange = (values: SearchStateValues) => {
    if (values.pageIndex) setPageIndexState(values.pageIndex ?? pageIndex);
    if (values.pageSize) setPageSizeState(values.pageSize ?? pageSize);
    if (values.keyword) setKeywordState(values.keyword ?? keyword);
  };

  const getPaginationProps = (props: PaginationProps): PaginationProps => {
    return { pageSize: pageSizeState, current: pageIndexState, hideOnSinglePage: true, ...props };
  };

  const values = { keyword: keywordState, pageIndex: pageIndexState, pageSize: pageSizeState };

  return { values, onKeywordChange, onPaginationChange, getPaginationProps };
};
