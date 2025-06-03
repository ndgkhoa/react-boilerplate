export type BasePaginationParams = {
  pageIndex?: number;
  pageSize?: number;
};

export type BaseSearchParams = {
  keyword?: string;
  userId?: string;
  pageIndex?: number;
  pageSize?: number;
  filter?: string;
  X_DEVICE_UDID?: string;
};

export type BaseParams = {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  X_DEVICE_UDID?: string;
};

export type BaseFilterParams = BasePaginationParams & BaseSearchParams;

export type BaseResponse<T> = {
  Data: T;
  TotalRecord: number;
  StatusCode: number;
  Message: string;
};

export type BaseEntity = {
  CreatedDate: string;
  CreatedById: string;
  CreatedName: string;
  UpdatedDate: string;
  UpdatedById: string;
  IsDeleted: boolean;
};

export type OptionValue = {
  Label: string;
  Value: string;
};
