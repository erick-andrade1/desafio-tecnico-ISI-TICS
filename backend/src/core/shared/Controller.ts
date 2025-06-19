export interface Controller {
  execute(req: any, res: any): Promise<any>;
}
