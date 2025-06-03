import {
  useQueryParams as useQueryParamsLib,
  NumberParam,
  StringParam,
  withDefault,
} from 'use-query-params';
import debounce from 'lodash/debounce';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_KEYWORD = undefined;

const DEBOUNCE_TIME = 500;

export const useQueryParams = () => {
  const [queryParams, setQueryParams] = useQueryParamsLib({
    page: withDefault(NumberParam, DEFAULT_PAGE),
    pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
    keyword: withDefault(StringParam, DEFAULT_KEYWORD),
  });

  const setQueryWithDebounce = debounce((params: Partial<typeof queryParams>) => {
    setQueryParams(params);
  }, DEBOUNCE_TIME);

  return { queryParams, setQueryParams, setQueryWithDebounce };
};
