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
      page: page === 0 ? page + 1 : page,
      limit: limit,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
    };
  }
}
