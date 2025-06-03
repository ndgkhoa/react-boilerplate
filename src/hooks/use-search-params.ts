import { useSearchParams as useSearchParamsRRD } from 'react-router-dom';

interface SearchParamsConfig<T> {
  defaultValues?: Partial<T>;
}

export const useSearchParams = <T = Record<string, unknown>>(
  config: SearchParamsConfig<T> = {}
) => {
  const [searchParamsRRD, setSearchParamsRRD] = useSearchParamsRRD();

  const getSearchParams = (k: keyof Partial<T>) => {
    return searchParamsRRD.get(k as string) ?? config?.defaultValues?.[k];
  };

  const setSearchParams = (params: Partial<T>) => {
    for (const [key, value] of Object.entries(params)) {
      if (value === null || value === undefined) {
        searchParamsRRD.delete(key);
        continue;
      }

      if (typeof value === 'string') {
        searchParamsRRD.set(key, value);
        continue;
      }

      if (typeof value !== 'string') {
        searchParamsRRD.set(key, JSON.stringify(value));
      }
    }
    setSearchParamsRRD(searchParamsRRD);
  };

  return { getSearchParams, setSearchParams };
};
