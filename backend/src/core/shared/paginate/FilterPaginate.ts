export class FilterPaginate<T = any> {
  readonly page: number;
  readonly limit: number;

  constructor(readonly filter: T, page: number = 1, limit: number = 10) {
    this.page = Math.max(0, page - 1);
    this.limit = Math.max(1, limit);
  }
}
