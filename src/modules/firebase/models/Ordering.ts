export enum Order {
  asc = 'asc',
  desc = 'desc',
}

export interface Ordering {
  orderBy: string;
  order: Order;
  limit: number;
  startAfter: number;
}
