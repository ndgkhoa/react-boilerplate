import type { TableProps } from 'antd';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchParamKeys } from '~/constants/search-param-keys';

const DEFAULT_PAGE_SIZE = '10';
const DEFAULT_PAGE_INDEX = '1';
const DEFAULT_TOTAL_RECORD = 0;

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationState, setPaginationState] = useState({
    pageIndex: Number(DEFAULT_PAGE_INDEX),
    pageSize: Number(DEFAULT_PAGE_SIZE),
  });

  const pageIndex = Number(searchParams.get(SearchParamKeys.PAGE_INDEX) ?? DEFAULT_PAGE_INDEX);
  const pageSize = Number(searchParams.get(SearchParamKeys.PAGE_SIZE) ?? DEFAULT_PAGE_SIZE);

  const onPaginationChange = (pageIndex: number, pageSize: number) => {
    if (pageIndex) searchParams.set(SearchParamKeys.PAGE_INDEX, pageIndex.toString());
    if (pageSize) searchParams.set(SearchParamKeys.PAGE_SIZE, pageSize.toString());

    setSearchParams(searchParams);
  };

  const onPaginationStateChange = (pageIndex: number, pageSize: number) => {
    setPaginationState({ pageIndex, pageSize });
  };

  const paginationProps = ({
    total = DEFAULT_TOTAL_RECORD,
    mode = 'searchParams',
  }: {
    total?: number;
    mode?: 'state' | 'searchParams';
  }): TableProps['pagination'] => ({
    total,
    pageSize: mode === 'state' ? paginationState.pageSize : pageSize,
    current: mode === 'state' ? paginationState.pageIndex : pageIndex,
    onChange: mode === 'state' ? onPaginationStateChange : onPaginationChange,
    hideOnSinglePage: true,
  });

  return {
    pageIndex,
    pageSize,
    pageIndexState: paginationState.pageIndex,
    pageSizeState: paginationState.pageSize,
    onPaginationChange,
    onPaginationStateChange,
    paginationProps,
    getPaginationProps: paginationProps,
  };
};
