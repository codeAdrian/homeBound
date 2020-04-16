export interface QueryFilter {
  field: string;
  operator: '==' | '>=' | '<=' | '<' | '>' | 'array-contains';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}
