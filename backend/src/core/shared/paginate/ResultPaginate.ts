export interface Meta {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export class ResultPaginate<T = any> {
  readonly data: T[];
  readonly meta: Meta;

  constructor(page: number, limit: number, count: number, data: T[]) {
    this.data = data;
    this.meta = {
      page: page + 1,
      limit: limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    };
  }

  map<NewType>(mapFn: (item: T) => NewType): ResultPaginate<NewType> {
    const data = this.data.map(mapFn);
    return new ResultPaginate<NewType>(
      this.meta.page - 1,
      this.meta.limit,
      this.meta.totalItems,
      data,
    );
  }
}
