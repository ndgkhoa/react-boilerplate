import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanSearchParams = (params: any) => omitBy(params, isNil);
