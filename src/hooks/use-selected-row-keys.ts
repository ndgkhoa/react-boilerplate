import type { TableProps } from 'antd';
import { useState, type Key } from 'react';
import difference from 'lodash/difference';
import uniq from 'lodash/uniq';

export const useSelectedRowKeys = <TData>(config: { keyFieldName?: keyof TData } = {}) => {
  const { keyFieldName = 'Id' } = config;
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const resetSelectedRowKeys = () => setSelectedRowKeys([]);

  const rowSelectionProp: TableProps['rowSelection'] = {
    selectedRowKeys,
    onSelect: (record, selected) => {
      if (selected) {
        setSelectedRowKeys((prev) => uniq([...prev, record[keyFieldName]]));
      } else {
        setSelectedRowKeys((prev) => difference(prev, [record[keyFieldName]]));
      }
    },
    onSelectAll: (selected, _, changeRows) => {
      const changeRowKeys = changeRows.map((row) => row[keyFieldName]);
      if (selected) {
        setSelectedRowKeys((prev) => uniq([...prev, ...changeRowKeys]));
      } else {
        setSelectedRowKeys((prev) => difference(prev, changeRowKeys));
      }
    },
  };

  return { selectedRowKeys, rowSelectionProp, resetSelectedRowKeys };
};
