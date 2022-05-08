export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _limit?: number;
  _total?: number;
  _page?: number;
  _order?: "asc" | "desc";
  [key: string]: any;
}
