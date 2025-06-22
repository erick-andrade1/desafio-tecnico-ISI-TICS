export class FilterPaginate<T = any> {
  readonly page: number;
  readonly limit: number;

  constructor(readonly filter: T, page: number = 1, limit: number = 10) {
    if (limit > 50) {
      limit = 50;
    }

    this.page = Math.max(0, page);
    this.limit = Math.max(1, limit);
  }
}
