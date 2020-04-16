export type Order = 'asc' | 'desc';

export interface Ordering {
  orderBy: string;
  order: Order;
  limit: number;
  startAfter: number;
}
