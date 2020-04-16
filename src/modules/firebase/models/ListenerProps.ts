export interface ListenerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successFunction: (data: any) => void;
  errorFunction: (error: string) => void;
}
