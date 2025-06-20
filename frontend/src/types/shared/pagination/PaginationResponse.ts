export interface Meta {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface IPaginateResponse<T> {
  meta: Meta;
  data: T[];
}
